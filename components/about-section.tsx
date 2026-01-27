'use client';

import { Profile } from '@/types';
import { Mail, Download } from 'lucide-react';

interface AboutSectionProps {
    profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
    return (
        <section id="about" className="relative py-24">

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Section Title - Centered */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-16">About Me</h2>

                    {/* Image - Centered */}
                    {profile.avatar_url && (
                        <div className="mb-12 flex justify-center">
                            <img
                                src={profile.avatar_url}
                                alt="Profile"
                                className="rounded-2xl w-64 h-64 object-cover shadow-lg"
                            />
                        </div>
                    )}

                    {/* Bio Text - Centered */}
                    <p className="text-lg text-foreground/80 mb-8 leading-relaxed whitespace-pre-wrap">
                        {profile.bio}
                    </p>

                    {/* Buttons - Centered */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {profile.cv_url && (
                            <a
                                href={profile.cv_url}
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                <Download className="w-4 h-4" />
                                Download CV
                            </a>
                        )}
                        <a
                            href="mailto:danielalli5742@gmail.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-lg font-medium hover:bg-border transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
