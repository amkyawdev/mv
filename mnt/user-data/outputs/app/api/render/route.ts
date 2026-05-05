import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface RenderRequest {
  videoId: string;
  subtitles: Array<{
    startTime: string;
    endTime: string;
    text: string;
  }>;
  style: {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    backgroundOpacity: number;
    position: 'top' | 'center' | 'bottom';
    alignment: 'left' | 'center' | 'right';
    padding: number;
    lineSpacing: number;
    shadowEnabled: boolean;
    shadowBlur: number;
    shadowColor: string;
    strokeEnabled: boolean;
    strokeWidth: number;
    strokeColor: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: RenderRequest = await request.json();

    if (!body.videoId || !body.subtitles || !body.style) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send to Docker processing service
    const processingApiUrl = process.env.PROCESSING_API_URL || 'http://localhost:5000';

    const response = await axios.post(`${processingApiUrl}/api/render`, {
      videoId: body.videoId,
      subtitles: body.subtitles,
      style: body.style,
    });

    return NextResponse.json(
      {
        success: true,
        jobId: response.data.jobId,
        status: response.data.status,
        message: 'Video processing started',
      },
      { status: 202 }
    );
  } catch (error) {
    console.error('Render error:', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Processing service error' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to start video processing' },
      { status: 500 }
    );
  }
}

// GET status of a processing job
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const processingApiUrl = process.env.PROCESSING_API_URL || 'http://localhost:5000';

    const response = await axios.get(`${processingApiUrl}/api/job/${jobId}`);

    return NextResponse.json(
      {
        success: true,
        jobId,
        status: response.data.status,
        progress: response.data.progress,
        downloadUrl: response.data.downloadUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Status check error:', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Failed to get job status' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to check job status' },
      { status: 500 }
    );
  }
}
