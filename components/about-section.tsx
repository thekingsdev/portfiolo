'use client';

import { Profile } from '@/types';
import { Mail, Download } from 'lucide-react';
import Image from 'next/image';

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
                        <div className="relative w-64 h-64 mx-auto mb-12 shadow-lg rounded-2xl overflow-hidden">
                            <Image
                                src={profile.avatar_url}
                                alt="Profile"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 256px"
                                priority
                            />
                        </div>
                    )}

                    {/* Bio Text - Centered */}
                    <p className="text-lg text-foreground/80 mb-8 leading-relaxed whitespace-pre-wrap">
                        {profile.bio}
                    </p>

                    {/* Buttons - Centered */}

                </div>
            </div>
        </section>
    );
}
