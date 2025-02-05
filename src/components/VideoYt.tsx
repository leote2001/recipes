"use client"
interface VTProps {
    vidUrl: string;
}
export default function VideoYt({ vidUrl }: VTProps) {
    return (
        <div>
            <h3>Recipe video</h3>
            <iframe
                src={vidUrl}
                width="560"
                height="315"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title='Recipe video'
            >
            </iframe>
        </div>
    );
}