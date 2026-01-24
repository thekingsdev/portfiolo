export interface Project {
    id: string;
    title: string;
    description: string | null;
    image_url: string;
    created_at: string;
    display_order: number;
}

export interface Profile {
    id: string;
    bio: string | null;
    avatar_url: string | null;
    cv_url: string | null;
    updated_at: string;
}

export interface ProjectFormData {
    title: string;
    description: string;
    image: FileList;
}

export interface ProfileFormData {
    bio: string;
    avatar?: FileList;
    cv?: FileList;
}
