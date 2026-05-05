'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, Upload, Settings, BookOpen, User } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Play, mobile: true },
  { href: '/upload', label: 'Upload', icon: Upload, mobile: true },
  { href: '/editor', label: 'Editor', icon: Settings, mobile: true },
  { href: '/docs', label: 'Docs', icon: BookOpen, mobile: false },
  { href: '/about', label: 'About', icon: User, mobile: false },
];

export default function Navigation() {
  const pathname = usePathname() || '/';

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-dark-surface border-t border-dark-border">
        <div className="flex justify-around items-center h-16 gap-1">
          {navItems.filter(item => item.mobile).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-neon-blue/20 text-neon-blue'
                    : 'text-gray-400 hover:text-dark-text'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-dark-surface/80 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-blue to-soft-gold flex items-center justify-center group-hover:shadow-neon-blue transition-all">
              <Play size={18} className="text-black" />
            </div>
            <span className="font-display font-bold text-lg gradient-text">MovieRecap</span>
          </Link>

          {/* Nav Items */}
          <div className="flex gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-neon-blue'
                      : 'text-gray-400 hover:text-dark-text'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link href="/upload" className="btn-primary text-sm">
            Start Editing
          </Link>
        </div>
      </nav>

      {/* Mobile safe area spacer */}
      <div className="h-16 md:h-0" />
    </>
  );
}
