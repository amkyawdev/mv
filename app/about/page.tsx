'use client';

import Navigation from '@/components/Navigation';
import { Github, ExternalLink, Code2, Zap, Lock } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen md:pt-20 pb-20 md:pb-0 px-6 md:px-8">
        <div className="max-w-3xl mx-auto pt-8 md:pt-16 space-y-12">
          {/* Project Overview */}
          <section className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              About MovieRecap
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              MovieRecap is a modern, AI-powered platform built for content creators, editors, and filmmakers who need professional subtitle editing capabilities. We combine the power of cloud processing with an intuitive, beautiful interface to make subtitle work fast and enjoyable.
            </p>
          </section>

          {/* Vision */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold mb-4 gradient-text">
                Our Vision
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We believe subtitle creation shouldn't be complicated or expensive. MovieRecap brings professional-grade tools to everyone, removing friction from the editing workflow and letting creators focus on their content, not the tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Code2,
                  title: 'Modern Tech',
                  desc: 'Built with cutting-edge web technologies and cloud infrastructure',
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  desc: 'Optimized for speed with instant previews and rapid rendering',
                },
                {
                  icon: Lock,
                  title: 'Reliable',
                  desc: 'Production-ready infrastructure with professional video processing',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="glass p-6 rounded-lg space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                      <Icon size={20} className="text-neon-blue" />
                    </div>
                    <h3 className="font-semibold text-dark-text">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold gradient-text">
              Tech Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: 'Frontend',
                  items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                },
                {
                  category: 'Backend',
                  items: ['Next.js API Routes', 'Node.js', 'Express', 'Axios'],
                },
                {
                  category: 'Processing',
                  items: ['Docker', 'FFmpeg', 'Python', 'Linux'],
                },
                {
                  category: 'Deployment',
                  items: ['Vercel (Frontend)', 'Docker Hub', 'GitHub Actions', 'Cloud Storage'],
                },
              ].map((stack, i) => (
                <div key={i} className="glass p-6 rounded-lg">
                  <h3 className="font-semibold text-neon-blue mb-4">{stack.category}</h3>
                  <ul className="space-y-2">
                    {stack.items.map((item, j) => (
                      <li key={j} className="text-gray-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-soft-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Development */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold gradient-text">
              Development
            </h2>

            <p className="text-gray-400 leading-relaxed">
              MovieRecap is built as a modern full-stack web application with a focus on developer experience and code quality. The entire codebase is open-source and available on GitHub.
            </p>

            <div className="glass p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-dark-text">Getting Started Locally</h3>
              <pre className="bg-dark-surface p-4 rounded text-sm text-neon-blue overflow-x-auto">
                {`# Clone the repository
git clone https://github.com/amkyawdev/mv.git

# Install dependencies
npm install

# Start development server
npm run dev

# Start Docker processing service
docker-compose up -d

# Open http://localhost:3000`}
              </pre>
            </div>
          </section>

          {/* Links */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold gradient-text">
              Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'GitHub Repository',
                  desc: 'Source code and issue tracking',
                  icon: Github,
                  href: 'https://github.com/amkyawdev/mv',
                },
                {
                  title: 'Documentation',
                  desc: 'Learn how to use MovieRecap',
                  icon: Code2,
                  href: '/docs',
                },
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="glass p-6 rounded-lg hover:border-neon-blue/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon size={24} className="text-neon-blue" />
                      <ExternalLink size={16} className="text-gray-500 group-hover:text-neon-blue transition-colors" />
                    </div>
                    <h3 className="font-semibold text-dark-text mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-400">{link.desc}</p>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-dark-border pt-12 text-center space-y-3">
            <p className="text-gray-400">
              Built with care for creators, by developers who love video.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 MovieRecap. Open source under MIT License.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
