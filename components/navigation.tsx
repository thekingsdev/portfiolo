'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't show navigation on admin pages
    if (pathname?.startsWith('/admin') || pathname === '/login') {
        return null;
    }

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-none'
            }`}>
            <div className="container-custom py-6 flex items-center justify-between">
                <Link href="/" className="text-3xl font-script tracking-wide hover:opacity-70 transition-opacity text-foreground">
                    Kingscribe
                </Link>

                <div className="flex items-center gap-8">
                    <button
                        onClick={() => scrollToSection('work')}
                        className="text-sm font-medium hover:opacity-70 transition-opacity"
                    >
                        Work
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-sm font-medium hover:opacity-70 transition-opacity"
                    >
                        About
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-sm font-medium hover:opacity-70 transition-opacity"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </nav>
    );
}
