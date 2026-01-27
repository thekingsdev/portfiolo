'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Mail } from 'lucide-react';

export default function ContactSection() {
    const { elementRef, isVisible } = useScrollReveal();

    return (
        <section id="contact" className="relative py-32">
            <div
                ref={elementRef}
                className={`container-custom relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                style={{ opacity: isVisible ? 1 : 0 }}
            >
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        Let's Work Together
                    </h2>
                    <p className="text-xl text-foreground/60 mb-12">
                        Have a project in mind? I'd love to hear from you.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="mailto:danielalli5742@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                            <Mail className="w-5 h-5" />
                            Get in Touch
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 justify-center pt-12">
                        {/* Pinterest */}
                        <a
                            href="https://pin.it/6aVb8OjxX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all"
                            aria-label="Pinterest"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.88-.18-2.26 0-3.24l1.29-5.46s-.33-.65-.33-1.62c0-1.52.88-2.65 1.98-2.65.93 0 1.38.7 1.38 1.54 0 .94-.6 2.35-.91 3.66-.26 1.1.55 1.99 1.64 1.99 1.97 0 3.48-2.07 3.48-5.07 0-2.65-1.9-4.5-4.62-4.5-3.15 0-5 2.36-5 4.8 0 .95.37 1.97.83 2.52a.36.36 0 0 1 .08.35c-.09.38-.3 1.21-.34 1.38-.05.22-.17.27-.4.16-1.38-.64-2.24-2.66-2.24-4.28 0-3.49 2.53-6.7 7.3-6.7 3.84 0 6.82 2.74 6.82 6.39 0 3.82-2.4 6.88-5.74 6.88-1.12 0-2.18-.58-2.54-1.27l-.69 2.63c-.25.96-.92 2.16-1.37 2.9A12 12 0 1 0 12 0z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/the.kingsscribe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all"
                            aria-label="Instagram"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="container-custom pt-20 mt-20 border-t border-border">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
                    <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
                    <p>Designed & Developed with ❤️</p>
                </div>
            </footer>
        </section>
    );
}
