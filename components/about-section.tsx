'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import { Profile } from '@/types';

interface AboutSectionProps {
    profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
    const handleDownloadCV = () => {
        if (profile.cv_url) {
            window.open(profile.cv_url, '_blank');
        }
    };

    return (
        <section id="about" className="py-24 bg-muted">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Profile Image */}
                        <div className="order-2 md:order-1">
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                                {profile.avatar_url ? (
                                    <Image
                                        src={profile.avatar_url}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <span className="text-6xl font-bold">?</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bio and CTA */}
                        <div className="order-1 md:order-2 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                About
                            </h2>

                            <div className="prose prose-lg">
                                <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                                    {profile.bio || 'Your bio goes here. Update this from the admin dashboard.'}
                                </p>
                            </div>

                            {profile.cv_url && (
                                <button
                                    onClick={handleDownloadCV}
                                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Download className="w-5 h-5" />
                                    Download CV
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
