'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

import Aurora from '@/components/Aurora';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Try Supabase authentication first
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (!error && data.session) {
                    // Store the access token in a cookie
                    document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600`;
                    router.push('/admin');
                    router.refresh();
                    return;
                }
            } catch (supabaseError) {
                console.log('Supabase not configured, using mock auth');
            }

            // Fallback to mock authentication
            const { mockAuth } = await import('@/lib/mock-data');
            const result = await mockAuth.signIn(email, password);

            if (result.success && result.session) {
                document.cookie = `sb-access-token=${result.session.access_token}; path=/; max-age=3600`;
                router.push('/admin');
                router.refresh();
            } else {
                throw new Error(result.error || 'Invalid credentials');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden px-4">
            {/* Background Aurora */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Aurora
                    colorStops={["#bababa", "#B19EEF", "#5227FF"]}
                    blend={0.5}
                    amplitude={1.2}
                    speed={0.4}
                />
            </div>

            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl relative z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Admin Login</h1>
                    <p className="text-white/60">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="bg-blue-500/10 text-blue-300 text-sm p-3 rounded-lg border border-blue-500/20">
                        <strong>Demo Mode:</strong> Use <code className="bg-blue-500/20 px-1 rounded text-white">admin@portfolio.com</code> / <code className="bg-blue-500/20 px-1 rounded text-white">admin123</code>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/30"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2 text-white">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/30"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
