'use client';
// Fixed apostrophe build error

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Mail, Send, Loader2, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
    const { elementRef, isVisible } = useScrollReveal();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Open mail client
        const mailtoLink = `mailto:danielalli5742@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
        window.location.href = mailtoLink;

        setIsSubmitting(false);
        setIsSuccess(true);
        reset();

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <section id="contact" className="relative py-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div
                ref={elementRef}
                className={`container-custom relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Text & Socials */}
                    <div className="space-y-8 text-center md:text-left">
                        <div>
                            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                                Contact
                            </span>
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                                Let&apos;s Work Together
                            </h2>
                            <p className="text-xl text-foreground/60 leading-relaxed">
                                Have a project in mind or just want to say hi? I&apos;m always open to discussing new ideas and opportunities.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 justify-center md:justify-start text-foreground/80">
                                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-accent" />
                                </div>
                                <a href="mailto:danielalli5742@gmail.com" className="hover:text-accent transition-colors">
                                    danielalli5742@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 justify-center md:justify-start pt-4">
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/2347057424156"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 fill-current stroke-none"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>

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

                    {/* Right Side: Form */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-6">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-foreground/60 mb-8">
                                        Opening your email client to send the message...
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="text-accent hover:text-accent/80 font-medium"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                {...register('name')}
                                                className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && (
                                                <p className="text-xs text-red-400">{errors.name.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                {...register('email')}
                                                className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-400">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            type="text"
                                            {...register('subject')}
                                            className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20`}
                                            placeholder="Project Inquiry"
                                        />
                                        {errors.subject && (
                                            <p className="text-xs text-red-400">{errors.subject.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            {...register('message')}
                                            className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-white/20 resize-none`}
                                            placeholder="Tell me about your project..."
                                        />
                                        {errors.message && (
                                            <p className="text-xs text-red-400">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-foreground text-background rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="container-custom pt-20 mt-20 border-t border-border relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
                    <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
                    <p>Developed with kingsscribe</p>
                </div>
            </footer>
        </section>
    );
}
