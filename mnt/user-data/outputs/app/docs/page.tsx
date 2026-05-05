'use client';

import Navigation from '@/components/Navigation';
import { ChevronRight } from 'lucide-react';

export default function DocsPage() {
  const docs = [
    {
      title: 'Getting Started',
      sections: [
        {
          heading: 'What is MovieRecap?',
          content:
            'MovieRecap is a modern subtitle editing platform that lets you upload videos, edit SRT subtitle files, customize their appearance, and render the final output with perfectly styled subtitles burned into the video.',
        },
        {
          heading: 'System Requirements',
          content:
            'A modern web browser (Chrome, Firefox, Safari, Edge). No installation needed – everything runs in the cloud.',
        },
      ],
    },
    {
      title: 'How to Upload',
      sections: [
        {
          heading: 'Step 1: Go to Upload',
          content:
            'Click the "Upload" button in the navigation menu or visit the Upload page directly.',
        },
        {
          heading: 'Step 2: Select Your Video',
          content:
            'Drag and drop your video file into the upload area, or click to browse your computer. We support MP4, MOV, AVI, MKV, and more.',
        },
        {
          heading: 'Step 3: Wait for Upload',
          content:
            'Your video will upload and be processed. The progress bar shows the upload status. Once complete, you can proceed to editing.',
        },
      ],
    },
    {
      title: 'How to Edit Subtitles',
      sections: [
        {
          heading: 'Load SRT File',
          content:
            'In the Editor, click "Upload SRT File" to import your subtitle file. MovieRecap will parse and display all subtitles with their timings.',
        },
        {
          heading: 'Edit Text',
          content:
            'Click any subtitle in the list to select it, then edit the text directly. Changes are applied in real-time in the preview.',
        },
        {
          heading: 'Adjust Timing',
          content:
            'Use the timeline sync slider to adjust when subtitles appear and disappear. Fine-tune the exact start and end times for perfect synchronization.',
        },
      ],
    },
    {
      title: 'Customizing Style',
      sections: [
        {
          heading: 'Font & Size',
          content:
            'Choose from various fonts (Arial, Helvetica, etc.) and adjust the size from 12px to 72px. Your changes preview in real-time on the video.',
        },
        {
          heading: 'Colors',
          content:
            'Set the font color and background color using the color picker. Adjust background opacity for transparency effects.',
        },
        {
          heading: 'Position & Layout',
          content:
            'Place subtitles at the top, center, or bottom of the video. Align text left, center, or right. Adjust padding and line spacing for perfect presentation.',
        },
        {
          heading: 'Advanced Effects',
          content:
            'Add shadow and stroke effects to make subtitles pop. Customize blur amount and stroke width for your desired look.',
        },
      ],
    },
    {
      title: 'Rendering & Export',
      sections: [
        {
          heading: 'Render Your Video',
          content:
            'Once you\'re happy with your subtitles and styling, click "Render & Download". The system will burn your styled subtitles into the video using industry-standard FFmpeg.',
        },
        {
          heading: 'Download',
          content:
            'After rendering completes, download the final video file with embedded subtitles. The output maintains the original quality and resolution.',
        },
      ],
    },
    {
      title: 'Supported Formats',
      sections: [
        {
          heading: 'Video Formats',
          content:
            'MP4, MOV, AVI, MKV, WebM, FLV, WMV, 3GP. Most common video formats are supported.',
        },
        {
          heading: 'Subtitle Formats',
          content:
            'SRT (SubRip Text) is the primary supported format. This is the most common subtitle format used worldwide.',
        },
        {
          heading: 'Output Format',
          content:
            'Output videos are rendered as MP4 with H.264 encoding for maximum compatibility across devices and platforms.',
        },
      ],
    },
    {
      title: 'System Architecture',
      sections: [
        {
          heading: 'Frontend',
          content:
            'Built with Next.js 14 and React. Responsive, mobile-first design using Tailwind CSS. Runs entirely in your browser.',
        },
        {
          heading: 'Backend',
          content:
            'Next.js API routes handle file uploads and coordinate with the processing service. Scalable and serverless-ready on Vercel.',
        },
        {
          heading: 'Processing',
          content:
            'Docker container with FFmpeg processes videos asynchronously. Subtitle rendering uses the drawtext filter for precise styling.',
        },
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen md:pt-20 pb-20 md:pb-0 px-6 md:px-8">
        <div className="max-w-3xl mx-auto pt-8 md:pt-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Documentation
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Everything you need to know about using MovieRecap
          </p>

          <div className="space-y-12">
            {docs.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-2xl font-display font-bold gradient-text">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.sections.map((subsection, j) => (
                    <div key={j} className="glass p-6 rounded-lg hover:border-neon-blue/50 transition-colors">
                      <h3 className="font-semibold text-dark-text mb-2 flex items-center gap-2">
                        <ChevronRight size={18} className="text-neon-blue" />
                        {subsection.heading}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-8 rounded-lg mt-12 border-l-4 border-neon-blue">
            <h3 className="font-semibold text-dark-text mb-2">Need Help?</h3>
            <p className="text-gray-400">
              For additional support, check the GitHub repository or open an issue. We're constantly improving MovieRecap based on user feedback.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
