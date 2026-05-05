'use client';

import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  id: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFiles = (fileList: FileList) => {
    const videoFiles = Array.from(fileList).filter(file =>
      file.type.startsWith('video/')
    );

    videoFiles.forEach(file => {
      const id = Math.random().toString(36).substr(2, 9);
      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
        id,
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev =>
            prev.map(f =>
              f.id === id ? { ...f, progress: 100, status: 'completed' } : f
            )
          );
        }
        setFiles(prev =>
          prev.map(f => (f.id === id ? { ...f, progress: Math.min(progress, 99) } : f))
        );
      }, 300);

      // Simulate upload to server
      const formData = new FormData();
      formData.append('file', file);

      fetch('/api/upload', { method: 'POST', body: formData })
        .catch(() => {
          clearInterval(interval);
          setFiles(prev =>
            prev.map(f => (f.id === id ? { ...f, status: 'error' } : f))
          );
        });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen md:pt-20 pb-20 md:pb-0 px-6 md:px-8">
        <div className="max-w-4xl mx-auto pt-8 md:pt-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Upload Your Movie
            </h1>
            <p className="text-gray-400 text-lg">
              Select a video file to begin editing subtitles. Supports MP4, MOV, AVI, and more.
            </p>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`glass p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer mb-12 ${
              isDragging
                ? 'border-neon-blue bg-neon-blue/10 shadow-neon-blue'
                : 'border-dark-border hover:border-neon-blue/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neon-blue/10 flex items-center justify-center animate-pulse">
                <Upload size={32} className="text-neon-blue" />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-dark-text mb-2">
                  Drop your video here
                </p>
                <p className="text-gray-400">
                  or click to browse your files
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Maximum file size: 2GB
              </p>
            </div>
          </div>

          {/* Upload List */}
          {files.length > 0 && (
            <div className="space-y-4 mb-12">
              <h2 className="text-lg font-semibold text-dark-text">Uploads</h2>
              {files.map(file => (
                <div
                  key={file.id}
                  className="glass p-4 md:p-6 rounded-lg hover:border-neon-blue/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-dark-text truncate">{file.name}</p>
                      <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {file.status === 'uploading' && (
                        <Loader size={20} className="text-neon-blue animate-spin" />
                      )}
                      {file.status === 'completed' && (
                        <CheckCircle size={20} className="text-neon-blue" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle size={20} className="text-red-400" />
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-blue to-soft-gold transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{Math.round(file.progress)}%</p>

                  {/* Action Button */}
                  {file.status === 'completed' && (
                    <Link
                      href={`/editor?video=${file.id}`}
                      className="inline-block mt-4 text-sm text-neon-blue hover:text-soft-gold transition-colors font-medium"
                    >
                      Go to Editor →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="glass p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-dark-text mb-3">Supported Formats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400">
              <div>• MP4</div>
              <div>• MOV</div>
              <div>• AVI</div>
              <div>• MKV</div>
              <div>• WebM</div>
              <div>• FLV</div>
              <div>• WMV</div>
              <div>• 3GP</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
