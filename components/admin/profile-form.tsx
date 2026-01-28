'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save } from 'lucide-react';
import Image from 'next/image';
import { Profile } from '@/types';

const profileSchema = z.object({
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    avatar: z.any().optional(),
    cv: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    profile: Profile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            bio: profile.bio || '',
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        setUpdating(true);
        setError('');
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append('bio', data.bio);

            if (data.avatar?.[0]) {
                formData.append('avatar', data.avatar[0]);
            }

            if (data.cv?.[0]) {
                formData.append('cv', data.cv[0]);
            }

            const response = await fetch('/api/profile', {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }

            setSuccess(true);
            router.refresh();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 text-green-400 text-sm p-3 rounded-lg border border-green-500/20">
                        Profile updated successfully!
                    </div>
                )}

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2 text-white">
                        Bio *
                    </label>
                    <textarea
                        id="bio"
                        {...register('bio')}
                        rows={6}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/30"
                        placeholder="Tell visitors about yourself..."
                    />
                    {errors.bio && (
                        <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                        Current Profile Picture
                    </label>
                    {profile.avatar_url ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-black/30 mb-4 border border-white/10">
                            <Image
                                src={profile.avatar_url}
                                alt="Current avatar"
                                fill
                                className="object-cover"
                                sizes="128px"
                            />
                        </div>
                    ) : (
                        <div className="w-32 h-32 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                            <span className="text-white/40">No image</span>
                        </div>
                    )}

                    <label htmlFor="avatar" className="block text-sm font-medium mb-2 text-white">
                        Update Profile Picture
                    </label>
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        {...register('avatar')}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:font-medium hover:file:bg-white/20 cursor-pointer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                        Current CV
                    </label>
                    {profile.cv_url ? (
                        <a
                            href={profile.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm mb-4 block"
                        >
                            View current CV →
                        </a>
                    ) : (
                        <p className="text-white/40 text-sm mb-4">No CV uploaded</p>
                    )}

                    <label htmlFor="cv" className="block text-sm font-medium mb-2 text-white">
                        Update CV (PDF)
                    </label>
                    <input
                        id="cv"
                        type="file"
                        accept="application/pdf"
                        {...register('cv')}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:font-medium hover:file:bg-white/20 cursor-pointer"
                    />
                </div>

                <button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-white text-black py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {updating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Save Changes
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
