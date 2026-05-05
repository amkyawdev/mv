'use client';

import { useState, useRef } from 'react';
import {
  ChevronDown,
  Download,
  Settings,
  Eye,
  Upload,
  Sparkles,
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Subtitle {
  index: number;
  startTime: string;
  endTime: string;
  text: string;
}

interface SubtitleStyle {
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
}

const defaultStyle: SubtitleStyle = {
  fontFamily: 'Arial',
  fontSize: 24,
  fontColor: '#ffffff',
  backgroundColor: '#000000',
  backgroundOpacity: 0.7,
  position: 'bottom',
  alignment: 'center',
  padding: 12,
  lineSpacing: 1.5,
  shadowEnabled: true,
  shadowBlur: 4,
  shadowColor: '#000000',
  strokeEnabled: false,
  strokeWidth: 1,
  strokeColor: '#000000',
};

export default function EditorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([
    { index: 1, startTime: '00:00:01,000', endTime: '00:00:05,000', text: 'Welcome to MovieRecap!' },
    { index: 2, startTime: '00:00:05,500', endTime: '00:00:10,000', text: 'Edit your subtitles with style.' },
  ]);

  const [style, setStyle] = useState<SubtitleStyle>(defaultStyle);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('subtitle');
  const [selectedSubtitleIndex, setSelectedSubtitleIndex] = useState<number | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const updateSubtitle = (index: number, field: keyof Subtitle, value: string) => {
    setSubtitles(prev =>
      prev.map((sub, i) => (i === index ? { ...sub, [field]: value } : sub))
    );
  };

  const updateStyle = (field: keyof SubtitleStyle, value: any) => {
    setStyle(prev => ({ ...prev, [field]: value }));
  };

  const handleSRTUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      // Simple SRT parser
      const blocks = content.split('\n\n');
      const parsed = blocks
        .map((block, idx) => {
          const lines = block.trim().split('\n');
          if (lines.length >= 3) {
            const [startTime, , endTime] = lines[1].split('-->');
            return {
              index: idx + 1,
              startTime: startTime.trim(),
              endTime: endTime.trim(),
              text: lines.slice(2).join('\n'),
            };
          }
          return null;
        })
        .filter(Boolean) as Subtitle[];
      setSubtitles(parsed);
    };
    reader.readAsText(file);
  };

  const DropdownSection = ({
    title,
    icon: Icon,
    id,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    id: string;
    children: React.ReactNode;
  }) => (
    <div className="dropdown-base">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between text-dark-text hover:text-neon-blue transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="text-neon-blue">{Icon}</div>
          <span className="font-semibold">{title}</span>
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            expandedSection === id ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expandedSection === id && (
        <div className="pt-3 space-y-3 border-t border-glass-border">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navigation />
      <main className="min-h-screen md:pt-20 pb-20 md:pb-0">
        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 max-w-7xl mx-auto">
          {/* Left: Video Preview */}
          <div className="flex-1 space-y-4 md:sticky md:top-20 md:h-fit">
            {/* Video Player */}
            <div className="glass p-4 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto rounded-lg bg-black"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/sample-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Preview Info */}
            <div className="glass p-4 rounded-lg text-sm text-gray-400 space-y-2">
              <p>
                <span className="text-neon-blue">Current Time:</span> 0:00
              </p>
              <p>
                <span className="text-neon-blue">Duration:</span> 10:45
              </p>
              <p>
                <span className="text-neon-blue">Resolution:</span> 1920x1080
              </p>
            </div>
          </div>

          {/* Right: Controls Panel */}
          <div className="w-full md:w-96 space-y-4 overflow-y-auto md:max-h-screen md:pr-2">
            {/* Upload SRT */}
            <div className="glass p-4 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer hover:text-neon-blue transition-colors">
                <Upload size={18} className="text-neon-blue" />
                <span className="font-medium">Upload SRT File</span>
                <input
                  type="file"
                  accept=".srt"
                  onChange={handleSRTUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Subtitle Controls */}
            <DropdownSection
              title="Subtitle Controls"
              icon={<Eye size={18} />}
              id="subtitle"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Edit Subtitles</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {subtitles.map((sub, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedSubtitleIndex(idx)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedSubtitleIndex === idx
                            ? 'bg-neon-blue/20 border border-neon-blue'
                            : 'bg-dark-surface border border-dark-border hover:border-neon-blue/50'
                        }`}
                      >
                        <p className="text-xs text-gray-500 mb-1">
                          {sub.startTime} → {sub.endTime}
                        </p>
                        <p className="text-sm text-dark-text line-clamp-2">{sub.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSubtitleIndex !== null && (
                  <textarea
                    value={subtitles[selectedSubtitleIndex]?.text || ''}
                    onChange={(e) =>
                      updateSubtitle(
                        selectedSubtitleIndex,
                        'text',
                        e.target.value
                      )
                    }
                    className="w-full text-sm"
                    rows={4}
                    placeholder="Edit selected subtitle..."
                  />
                )}

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Sync Timeline</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full"
                  />
                </div>
              </div>
            </DropdownSection>

            {/* Style Controls */}
            <DropdownSection
              title="Style Controls"
              icon={<Settings size={18} />}
              id="style"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Font Family</label>
                  <select
                    value={style.fontFamily}
                    onChange={(e) => updateStyle('fontFamily', e.target.value)}
                    className="w-full"
                  >
                    <option>Arial</option>
                    <option>Helvetica</option>
                    <option>Times New Roman</option>
                    <option>Courier New</option>
                    <option>Georgia</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Font Size: {style.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={style.fontSize}
                    onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Font Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={style.fontColor}
                      onChange={(e) => updateStyle('fontColor', e.target.value)}
                      className="flex-1 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={style.fontColor}
                      onChange={(e) => updateStyle('fontColor', e.target.value)}
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={style.backgroundColor}
                      onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                      className="flex-1 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={style.backgroundColor}
                      onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Background Opacity: {Math.round(style.backgroundOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={style.backgroundOpacity}
                    onChange={(e) => updateStyle('backgroundOpacity', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </DropdownSection>

            {/* Layout Controls */}
            <DropdownSection
              title="Layout Controls"
              icon={<Settings size={18} />}
              id="layout"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['top', 'center', 'bottom'] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => updateStyle('position', pos)}
                        className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                          style.position === pos
                            ? 'bg-neon-blue text-black'
                            : 'bg-dark-surface hover:border-neon-blue/50 border border-dark-border'
                        }`}
                      >
                        {pos.charAt(0).toUpperCase() + pos.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Alignment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => updateStyle('alignment', align)}
                        className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                          style.alignment === align
                            ? 'bg-neon-blue text-black'
                            : 'bg-dark-surface hover:border-neon-blue/50 border border-dark-border'
                        }`}
                      >
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Padding: {style.padding}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={style.padding}
                    onChange={(e) => updateStyle('padding', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Line Spacing: {style.lineSpacing.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.1"
                    value={style.lineSpacing}
                    onChange={(e) => updateStyle('lineSpacing', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </DropdownSection>

            {/* Advanced Effects */}
            <DropdownSection
              title="Advanced Effects"
              icon={<Sparkles size={18} />}
              id="advanced"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400">Shadow</label>
                  <input
                    type="checkbox"
                    checked={style.shadowEnabled}
                    onChange={(e) => updateStyle('shadowEnabled', e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                </div>

                {style.shadowEnabled && (
                  <>
                    <div>
                      <label className="text-sm text-gray-400 block mb-2">
                        Shadow Blur: {style.shadowBlur}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={style.shadowBlur}
                        onChange={(e) => updateStyle('shadowBlur', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400">Stroke</label>
                  <input
                    type="checkbox"
                    checked={style.strokeEnabled}
                    onChange={(e) => updateStyle('strokeEnabled', e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                </div>

                {style.strokeEnabled && (
                  <>
                    <div>
                      <label className="text-sm text-gray-400 block mb-2">
                        Stroke Width: {style.strokeWidth}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={style.strokeWidth}
                        onChange={(e) => updateStyle('strokeWidth', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </DropdownSection>

            {/* Render Button */}
            <button className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
              <Download size={18} />
              Render & Download
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
