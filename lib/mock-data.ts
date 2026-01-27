// Mock data layer using localStorage for testing without Supabase
// This allows the admin dashboard to work immediately

export interface MockProject {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    created_at: string;
    display_order: number;
}

export interface MockProfile {
    id: string;
    bio: string | null;
    avatar_url: string | null;
    cv_url: string | null;
    updated_at: string;
}

// Helper to check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Storage keys
const PROJECTS_KEY = 'portfolio_projects_v2';
const PROFILE_KEY = 'portfolio_profile';
const AUTH_KEY = 'portfolio_auth';

// Default profile
const DEFAULT_PROFILE: MockProfile = {
    id: '1',
    bio: 'Graphic designer specializing in modern, minimalist design. Passionate about creating beautiful and functional user experiences.',
    avatar_url: null,
    cv_url: null,
    updated_at: new Date().toISOString(),
};

// Mock credentials
export const MOCK_CREDENTIALS = {
    email: 'admin@portfolio.com',
    password: 'admin123',
};

// Authentication
export const mockAuth = {
    signIn: async (email: string, password: string) => {
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
            if (isBrowser) {
                localStorage.setItem(AUTH_KEY, 'authenticated');
            }
            return { success: true, session: { access_token: 'mock-token' } };
        }
        return { success: false, error: 'Invalid credentials' };
    },

    signOut: async () => {
        if (isBrowser) {
            localStorage.removeItem(AUTH_KEY);
        }
        return { success: true };
    },

    isAuthenticated: () => {
        if (!isBrowser) return false;
        return localStorage.getItem(AUTH_KEY) === 'authenticated';
    },
};

// Projects CRUD
export const mockProjects = {
    getAll: async (): Promise<MockProject[]> => {
        if (!isBrowser) return [];
        const data = localStorage.getItem(PROJECTS_KEY);
        if (data) return JSON.parse(data);

        // Initial seed data if storage is empty
        const initialProjects: MockProject[] = [
            {
                id: '1',
                title: 'The Brand Atelier: Business Checkup',
                description: 'Year-end diagnostic & growth workshop branding specifically designed to help businesses step into 2026 with clarity.',
                image_url: '/images/projects/business-checkup.jpg',
                created_at: new Date().toISOString(),
                display_order: 1
            },
            {
                id: '2',
                title: 'RUIMUN 2026 Sponsorship',
                description: 'Call for sponsorship campaign design for RUIMUN 2026, featuring bold typography and textured elements.',
                image_url: '/images/projects/ruimun-sponsorship.jpg',
                created_at: new Date(Date.now() - 86400000).toISOString(),
                display_order: 2
            },
            {
                id: '3',
                title: 'STUWES Easter Campaign',
                description: 'Impactful Easter visual identity centered around the theme "He rose, So will you".',
                image_url: '/images/projects/stuwes-easter.jpg',
                created_at: new Date(Date.now() - 172800000).toISOString(),
                display_order: 3
            }
        ];

        // Save initial data to local storage so it persists
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
        return initialProjects;
    },

    create: async (project: Omit<MockProject, 'id' | 'created_at' | 'display_order'>): Promise<MockProject> => {
        const newProject: MockProject = {
            ...project,
            id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString(),
            display_order: 0,
        };

        if (isBrowser) {
            const projects = await mockProjects.getAll();
            projects.unshift(newProject);
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        }

        return newProject;
    },

    delete: async (id: string): Promise<boolean> => {
        if (!isBrowser) return false;
        const projects = await mockProjects.getAll();
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
        return true;
    },

    update: async (id: string, updates: Partial<MockProject>): Promise<MockProject | null> => {
        if (!isBrowser) return null;
        const projects = await mockProjects.getAll();
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) return null;

        projects[index] = { ...projects[index], ...updates };
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
        return projects[index];
    },
};

// Profile CRUD
export const mockProfile = {
    get: async (): Promise<MockProfile> => {
        if (!isBrowser) return DEFAULT_PROFILE;
        const data = localStorage.getItem(PROFILE_KEY);
        return data ? JSON.parse(data) : DEFAULT_PROFILE;
    },

    update: async (updates: Partial<MockProfile>): Promise<MockProfile> => {
        const current = await mockProfile.get();
        const updated: MockProfile = {
            ...current,
            ...updates,
            updated_at: new Date().toISOString(),
        };

        if (isBrowser) {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
        }

        return updated;
    },

    initialize: async (): Promise<void> => {
        if (!isBrowser) return;
        const existing = localStorage.getItem(PROFILE_KEY);
        if (!existing) {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
        }
    },
};

// File to base64 conversion helper
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

// Initialize mock data on load
if (isBrowser) {
    mockProfile.initialize();
}
