import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <Link
                    href="/admin/projects"
                    className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow border border-border group"
                >
                    <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
                        Manage Projects
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </h2>
                    <p className="text-foreground/70">
                        Upload, edit, and delete your portfolio projects
                    </p>
                </Link>

                <Link
                    href="/admin/profile"
                    className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow border border-border group"
                >
                    <h2 className="text-2xl font-semibold mb-2 flex items-center justify-between">
                        Edit Profile
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </h2>
                    <p className="text-foreground/70">
                        Update your bio, profile picture, and CV
                    </p>
                </Link>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Quick Links</h3>
                <ul className="space-y-2 text-blue-800">
                    <li>
                        <Link href="/" className="hover:underline">
                            → View Public Portfolio
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://app.supabase.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            → Open Supabase Dashboard
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
