import { Project } from '@/types';
import TiltedCard from './ui/tilted-card';

export type CardVariant = 'overlay' | 'minimal' | 'magazine';

interface ProjectCardProps {
    project: Project;
    variant?: CardVariant;
    onClick?: () => void;
}

export default function ProjectCard({ project, variant = 'overlay', onClick }: ProjectCardProps) {
    // Determine aspect ratio based on variant
    const aspectRatio =
        variant === 'magazine' ? 'aspect-square' :
            variant === 'minimal' ? 'aspect-[3/2]' :
                'aspect-[4/3]'; // default overlay

    return (
        <div className={`w-full ${aspectRatio}`}>
            <TiltedCard
                imageSrc={project.image_url}
                altText={project.title}
                captionText={project.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                    <div className="w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl">
                        <span className="inline-block px-3 py-1 mb-2 text-xs font-medium tracking-wider text-black bg-white rounded-full w-fit">
                            PROJECT
                        </span>
                        <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2">
                            {project.title}
                        </h3>
                        {project.description && (
                            <p className="text-white/80 text-sm line-clamp-2">
                                {project.description}
                            </p>
                        )}
                    </div>
                }
                onClick={onClick}
            />
        </div>
    );
}
