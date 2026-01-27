'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import ProjectGrid from '@/components/project-grid';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import SkillsSection from '@/components/skills-section';
import ClickSpark from '@/components/ClickSpark';
import CustomCursor from '@/components/CustomCursor';
import Aurora from '@/components/Aurora';
import { RevealText, ScaleIn } from '@/components/animations';
import { Project, Profile } from '@/types';

export default function HomePage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

            // Fetch projects
            if (!supabaseUrl) {
                const { mockProjects } = await import('@/lib/mock-data');
                setProjects(await mockProjects.getAll());
            } else {
                const { data } = await supabase
                    .from('projects')
                    .select('*')
                    .order('display_order', { ascending: false })
                    .order('created_at', { ascending: false });
                setProjects(data || []);
            }

            // Fetch profile
            if (!supabaseUrl) {
                const { mockProfile } = await import('@/lib/mock-data');
                setProfile(await mockProfile.get());
            } else {
                const { data } = await supabase
                    .from('profile')
                    .select('*')
                    .single();
                setProfile(data);
            }

            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground/60">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <Aurora
                        colorStops={["#bababa", "#B19EEF", "#5227FF"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={1}
                    />
                </div>
                <ClickSpark
                    sparkColor='#FFFFFF'
                    sparkSize={8}
                    sparkRadius={20}
                    sparkCount={12}
                    duration={500}
                >
                    <div className="container-custom text-center">
                        <div className="max-w-5xl mx-auto space-y-8">
                            {/* Badge */}
                            <RevealText delay={0}>
                                <span className="inline-block px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-full text-sm font-medium">
                                    Creative Portfolio
                                </span>
                            </RevealText>

                            {/* Main Heading */}
                            <RevealText delay={0.15}>
                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.1]">
                                    Crafting Visual
                                    <span className="block gradient-text">Experiences</span>
                                </h1>
                            </RevealText>

                            {/* Subtitle */}
                            <RevealText delay={0.3}>
                                <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto font-light">
                                    A carefully curated collection of graphic design projects, branding, and creative work.
                                </p>
                            </RevealText>

                            {/* CTA */}
                            <RevealText delay={0.45}>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <button
                                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
                                    >
                                        View Projects
                                    </button>
                                    <button
                                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="px-8 py-4 border-2 border-foreground/20 rounded-full font-medium hover:border-foreground/40 transition-colors"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </RevealText>
                        </div>
                    </div>
                </ClickSpark>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Projects Section */}
            <section id="work" className="py-24 bg-background">
                <div className="container-custom">
                    <RevealText>
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
                            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                                Explore my recent projects and creative explorations
                            </p>
                        </div>
                    </RevealText>

                    <ProjectGrid projects={projects} />
                </div>
            </section>

            {/* Skills Section */}
            <SkillsSection />

            {/* Unified Aurora Section for About & Contact */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                    <Aurora
                        colorStops={["#bababa", "#B19EEF", "#5227FF"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                {/* About Section */}
                {profile && <AboutSection profile={profile} />}

                {/* Contact Section */}
                <ContactSection />
            </div>
        </>
    );
}
