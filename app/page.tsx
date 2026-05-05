'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Palette, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen md:pt-16 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-6 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 hover:border-neon-blue/60 transition-colors">
                <Sparkles size={16} className="text-neon-blue" />
                <span className="text-sm font-medium text-neon-blue">AI-Powered Movie Editor</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                Edit Movie
                <br />
                <span className="gradient-text">Subtitles Perfectly</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Upload your movie, customize subtitles with precision, and render the final video with AI-powered styling. Professional results in minutes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up pt-4" style={{ animationDelay: '0.2s' }}>
              <Link href="/upload" className="btn-primary inline-flex items-center justify-center gap-2">
                Start Editing
                <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn-secondary inline-flex items-center justify-center">
                Learn More
              </Link>
            </div>

            {/* Floating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 stagger-item">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  desc: 'Process videos in seconds with optimized rendering',
                },
                {
                  icon: Palette,
                  title: 'Fully Customizable',
                  desc: 'Control every aspect of subtitle appearance',
                },
                {
                  icon: Sparkles,
                  title: 'AI-Assisted',
                  desc: 'Smart suggestions for better subtitle styling',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="glass p-6 rounded-xl hover-lift group"
                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-blue/20 to-soft-gold/20 flex items-center justify-center mb-4 group-hover:shadow-neon-blue transition-all">
                      <Icon size={24} className="text-neon-blue" />
                    </div>
                    <h3 className="font-semibold text-dark-text mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-neon-blue/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-72 h-72 bg-soft-gold/5 rounded-full blur-3xl -z-10 animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 px-6 md:px-8 border-t border-dark-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Professional Features
              </h2>
              <p className="text-gray-400 text-lg">Everything you need for perfect subtitles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'SRT Subtitle Support',
                  desc: 'Upload and edit standard SRT subtitle files with full control',
                },
                {
                  title: 'Real-time Preview',
                  desc: 'See changes instantly on your video before rendering',
                },
                {
                  title: 'Advanced Styling',
                  desc: 'Font, size, color, shadow, and animation options',
                },
                {
                  title: 'Batch Processing',
                  desc: 'Process multiple videos with saved style presets',
                },
                {
                  title: 'Cloud Rendering',
                  desc: 'Powered by FFmpeg for professional video output',
                },
                {
                  title: 'Export Options',
                  desc: 'Download in multiple formats and resolutions',
                },
              ].map((feature, i) => (
                <div key={i} className="glass p-8 rounded-lg hover:border-neon-blue/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-neon-blue transition-all">
                      <ArrowRight size={20} className="text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-text mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6 md:px-8 border-t border-dark-border">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Ready to Create?
              </h2>
              <p className="text-gray-400 text-lg">
                Join thousands of creators using MovieRecap for professional subtitle editing
              </p>
            </div>
            <Link href="/upload" className="btn-primary inline-flex items-center justify-center gap-2">
              Start Your Project
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
