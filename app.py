from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import subprocess
import os
import json
from datetime import datetime
from pathlib import Path
import uuid
import threading

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = Path('/app/uploads')
DOWNLOAD_FOLDER = Path('/app/downloads')
CACHE_FOLDER = Path('/app/cache')

# Ensure directories exist
UPLOAD_FOLDER.mkdir(exist_ok=True)
DOWNLOAD_FOLDER.mkdir(exist_ok=True)
CACHE_FOLDER.mkdir(exist_ok=True)

# Job tracking
jobs = {}

class ProcessingJob:
    def __init__(self, job_id):
        self.job_id = job_id
        self.status = 'pending'  # pending, processing, completed, failed
        self.progress = 0
        self.error = None
        self.output_file = None
        self.created_at = datetime.now()

    def to_dict(self):
        return {
            'jobId': self.job_id,
            'status': self.status,
            'progress': self.progress,
            'error': self.error,
            'outputFile': self.output_file,
            'createdAt': self.created_at.isoformat(),
        }


def time_to_seconds(time_str):
    """Convert SRT time format to seconds"""
    # Format: HH:MM:SS,mmm
    parts = time_str.replace(',', '.').split(':')
    hours = int(parts[0])
    minutes = int(parts[1])
    seconds = float(parts[2])
    return hours * 3600 + minutes * 60 + seconds


def generate_subtitle_filter(subtitles, style):
    """Generate FFmpeg subtitles filter"""
    # This is a complex filter - in production, use proper SRT handling
    filter_parts = []
    
    for sub in subtitles:
        start = time_to_seconds(sub['startTime'])
        end = time_to_seconds(sub['endTime'])
        text = sub['text'].replace("'", "\\'")
        
        # Position mapping
        position_map = {
            'top': 'H/20',
            'center': 'h/2',
            'bottom': 'h*0.9'
        }
        y_pos = position_map.get(style['position'], 'h*0.9')
        
        # Alignment mapping
        align_map = {
            'left': '0',
            'center': '1',
            'right': '2'
        }
        alignment = align_map.get(style['alignment'], '1')
        
        # Build drawtext filter
        fontsize = style.get('fontSize', 24)
        fontcolor = style.get('fontColor', '#ffffff')
        
        filter_str = (
            f"drawtext="
            f"text='{text}':"
            f"fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:"
            f"fontsize={fontsize}:"
            f"fontcolor={fontcolor}:"
            f"x=(w-text_w)/2:"
            f"y={y_pos}:"
            f"enable='between(t,{start},{end})'"
        )
        
        filter_parts.append(filter_str)
    
    return ','.join(filter_parts) if filter_parts else None


def process_video(job_id, video_path, subtitles, style):
    """Process video and burn subtitles"""
    job = jobs[job_id]
    
    try:
        job.status = 'processing'
        job.progress = 10
        
        # Generate output filename
        output_filename = f"{job_id}_output.mp4"
        output_path = DOWNLOAD_FOLDER / output_filename
        
        # Generate subtitle filter
        subtitle_filter = generate_subtitle_filter(subtitles, style)
        
        # Build FFmpeg command
        cmd = [
            'ffmpeg',
            '-i', str(video_path),
            '-c:v', 'libx264',
            '-preset', 'medium',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
        ]
        
        # Add filter if subtitles exist
        if subtitle_filter:
            cmd.extend(['-vf', subtitle_filter])
        
        cmd.extend(['-y', str(output_path)])
        
        # Run FFmpeg
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True
        )
        
        # Monitor progress
        for line in process.stderr:
            if 'frame=' in line:
                # Extract frame number for progress estimation
                job.progress = min(90, job.progress + 1)
        
        process.wait()
        
        if process.returncode != 0:
            raise Exception('FFmpeg processing failed')
        
        job.status = 'completed'
        job.progress = 100
        job.output_file = f"/downloads/{output_filename}"
        
    except Exception as e:
        job.status = 'failed'
        job.error = str(e)
        print(f"Processing error: {e}")


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()}), 200


@app.route('/api/render', methods=['POST'])
def render_video():
    """Start video rendering job"""
    try:
        data = request.get_json()
        
        if not data.get('videoId') or not data.get('subtitles') or not data.get('style'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        video_id = data['videoId']
        subtitles = data['subtitles']
        style = data['style']
        
        # Find uploaded video
        video_path = None
        for file in UPLOAD_FOLDER.glob('*'):
            if file.stem == video_id:
                video_path = file
                break
        
        if not video_path or not video_path.exists():
            return jsonify({'error': 'Video not found'}), 404
        
        # Create job
        job_id = str(uuid.uuid4())
        job = ProcessingJob(job_id)
        jobs[job_id] = job
        
        # Start processing in background thread
        thread = threading.Thread(
            target=process_video,
            args=(job_id, video_path, subtitles, style)
        )
        thread.daemon = True
        thread.start()
        
        return jsonify({
            'success': True,
            'jobId': job_id,
            'status': 'queued',
            'message': 'Video processing started'
        }), 202
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/job/<job_id>', methods=['GET'])
def get_job_status(job_id):
    """Get job status"""
    if job_id not in jobs:
        return jsonify({'error': 'Job not found'}), 404
    
    job = jobs[job_id]
    response = job.to_dict()
    response['success'] = True
    
    return jsonify(response), 200


@app.route('/downloads/<filename>', methods=['GET'])
def download_file(filename):
    """Download processed video"""
    file_path = DOWNLOAD_FOLDER / filename
    
    if not file_path.exists():
        return jsonify({'error': 'File not found'}), 404
    
    return send_file(file_path, as_attachment=True)


@app.route('/api/cleanup', methods=['POST'])
def cleanup_old_files():
    """Clean up old files (run periodically)"""
    try:
        from datetime import timedelta
        cutoff = datetime.now() - timedelta(hours=24)
        
        # Clean old downloads
        for file in DOWNLOAD_FOLDER.glob('*'):
            if datetime.fromtimestamp(file.stat().st_mtime) < cutoff:
                file.unlink()
        
        return jsonify({'success': True, 'message': 'Cleanup completed'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
