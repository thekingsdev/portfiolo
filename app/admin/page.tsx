import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight mb-8 text-white">Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <Link
                    href="/admin/projects"
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all border border-white/10 group"
                >
                    <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between text-white">
                        Manage Projects
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-accent" />
                    </h2>
                    <p className="text-white/60">
                        Upload, edit, and delete your portfolio projects
                    </p>
                </Link>

                <Link
                    href="/admin/profile"
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all border border-white/10 group"
                >
                    <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between text-white">
                        Edit Profile
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-accent" />
                    </h2>
                    <p className="text-white/60">
                        Update your bio, profile picture, and CV
                    </p>
                </Link>
            </div>

            <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="font-semibold text-blue-300 mb-2">Quick Links</h3>
                <ul className="space-y-2 text-blue-200/80">
                    <li>
                        <Link href="/" className="hover:text-white transition-colors">
                            → View Public Portfolio
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://app.supabase.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            → Open Supabase Dashboard
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
