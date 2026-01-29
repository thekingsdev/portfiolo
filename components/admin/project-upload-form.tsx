'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';

import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    image: z.any().refine((files) => files?.length > 0, 'Image is required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectUploadForm() {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    // Monitor file selection to show preview or name if needed (optional enhancement)
    const selectedFile = watch('image');

    const simulateProgress = () => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 300);
        return interval;
    };

    const onSubmit = async (data: ProjectFormData) => {
        setUploading(true);
        setStatus('uploading');
        setError('');
        const progressInterval = simulateProgress();

        try {
            // Check if we're using Supabase or Mock data
            const isMock = !isSupabaseConfigured();

            // Debug: Check Session
            const { data: { session } } = await supabase.auth.getSession();
            console.log('Current Session:', session ? 'Active' : 'None', session?.user?.id);

            if (!session && !isMock) {
                throw new Error('You are not authenticated. Please log in again.');
            }

            if (isMock) {
                // Client-side mock upload
                // ... existing mock logic if needed or just skip for now as user uses Supabase
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
                setUploadProgress(100);
            } else {
                let imageFile = data.image[0];

                // Compress Image
                try {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(imageFile, options);
                    // Use compressed file if it is smaller, otherwise use original (unlikely but safe)
                    if (compressedFile.size < imageFile.size) {
                        imageFile = compressedFile;
                    }
                } catch (error) {
                    console.error('Compression failed, using original file:', error);
                }

                const fileExt = imageFile.name.split('.').pop() || 'jpg';
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `projects/${fileName}`;

                // 1. Upload Image directly from client
                // Note: supabase-js 'upload' doesn't provide progress callback in the promise-based method easily.
                // We rely on the simulated progress bar for the "feeling" of upload.
                const { error: uploadError } = await supabase.storage
                    .from('portfolio-assets')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    console.error('Upload Error:', uploadError);
                    throw new Error(`Upload failed: ${uploadError.message}`);
                }

                setUploadProgress(95); // Almost done

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('portfolio-assets')
                    .getPublicUrl(filePath);

                // 3. Insert Record directly from client
                const { error: dbError } = await supabase
                    .from('projects')
                    .insert({
                        title: data.title,
                        description: data.description,
                        image_url: publicUrl,
                    });

                if (dbError) {
                    console.error('DB Error:', dbError);
                    // Attempt to cleanup image if DB insert fails? (Optional but good practice)
                    throw new Error(`Database error: ${dbError.message}`);
                }

                setUploadProgress(100);
            }

            clearInterval(progressInterval);
            setStatus('success');
            setTimeout(() => {
                reset();
                setStatus('idle');
                setUploadProgress(0);
                router.refresh();
            }, 2000);

        } catch (err: any) {
            clearInterval(progressInterval);
            console.error('Submission Error:', err);
            setError(err.message || 'An error occurred');
            setStatus('error');
            setUploading(false);
        } finally {
            // Keep uploading true for a moment if success to show 100%
            if (status !== 'success') {
                setUploading(false);
            }
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-6 text-white">Upload New Project</h2>

            {!isSupabaseConfigured() && (
                <div className="mb-6 bg-yellow-500/10 text-yellow-400 text-sm p-4 rounded-lg border border-yellow-500/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold mb-1">Supabase Not Configured</p>
                        <p>Uploads will be simulated (mock mode). To save images to Supabase, please set up your environment variables.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20 flex items-center gap-2"
                        >
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2 text-white">
                        Project Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title')}
                        disabled={uploading}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/30 disabled:opacity-50"
                        placeholder="My Awesome Project"
                    />
                    {errors.title && (
                        <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2 text-white">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        rows={4}
                        disabled={uploading}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder:text-white/30 disabled:opacity-50"
                        placeholder="Tell us about this project..."
                    />
                    {errors.description && (
                        <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-2 text-white">
                        Project Image *
                    </label>
                    <div className="relative">
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            {...register('image')}
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:font-medium hover:file:bg-white/20 cursor-pointer disabled:opacity-50"
                        />
                    </div>

                    {errors.image && (
                        <p className="text-red-600 text-sm mt-1">{errors.image.message as string}</p>
                    )}
                </div>

                {/* Progress Bar */}
                <AnimatePresence>
                    {(uploading || status === 'success') && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1"
                        >
                            <div className="flex justify-between text-xs text-white/60">
                                <span>{status === 'success' ? 'Upload Complete' : 'Uploading...'}</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${status === 'success' ? 'bg-green-500' : 'bg-accent'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${status === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-black hover:opacity-90 disabled:opacity-50'
                        }`}
                >
                    {status === 'uploading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            Success!
                        </>
                    ) : (
                        <>
                            <Upload className="w-5 h-5" />
                            Upload Project
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
