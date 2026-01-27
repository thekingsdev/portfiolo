'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Folder, User, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

import Aurora from '@/components/Aurora';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        document.cookie = 'sb-access-token=; path=/; max-age=0';
        router.push('/login');
        router.refresh();
    };

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: Folder },
        { href: '/admin/projects', label: 'Projects', icon: Folder },
        { href: '/admin/profile', label: 'Profile', icon: User },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            {/* Shared Aurora Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <Aurora
                    colorStops={["#bababa", "#B19EEF", "#5227FF"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background/80 backdrop-blur-xl border-r border-white/10 flex flex-col z-20">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-tight text-white">Admin Panel</h1>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-blue-400"
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">View Portfolio</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-red-400"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="relative ml-64 p-8 z-10">
                <div className="bg-background/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 min-h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}
