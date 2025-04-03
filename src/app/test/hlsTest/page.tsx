'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MediaItem {
    id: string;
    fileName: string;
    thumbnailName: string;
    publicYn: string;
    fileNameUid: string;
}

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                const res = await fetch(`${apiUrl}/hlsMediaList`, {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch media list");

                const data: MediaItem[] = await res.json();
                setMediaList(data);
                
                // Fetch private images
                data.forEach(({ id, publicYn, thumbnailName }) => {
                    if (publicYn === "N" && thumbnailName) {
                        fetchPrivateImage(id, thumbnailName);
                    }
                });
            } catch (err) {
                console.error("Error fetching media list:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMediaList();
    }, [apiUrl]);

    const fetchPrivateImage = async (id: string, thumbnailName: string) => {
        try {
            const res = await fetch(`${apiUrl}/private/thumbnail/${thumbnailName}`, {
                credentials: "include",
            });
            if (!res.ok) throw new Error(`Failed to load private image: ${thumbnailName}`);
            
            const blob = await res.blob();
            setImageUrls(prev => ({ ...prev, [id]: URL.createObjectURL(blob) }));
        } catch (err) {
            console.error("Error fetching private image:", err);
        }
    };

    return (
        <div className='min-h-dvh'>
            <div className="my-16 px-4 md:w-[58rem]">
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <MediaGrid mediaList={mediaList} imageUrls={imageUrls} apiUrl={apiUrl} />
                )}
            </div>
        </div>
    );
}

const LoadingIndicator = () => (
    <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading...
    </div>
);

const MediaGrid = ({ mediaList, imageUrls, apiUrl }: { mediaList: MediaItem[], imageUrls: { [key: string]: string }, apiUrl?: string }) => (
    <div className="columns-3 gap-0 md:columns-3 md:gap-1">
        {mediaList.map(({ id, publicYn, thumbnailName, fileName, fileNameUid}) => {
            const isPublic = publicYn === "Y";
            const thumbnailUrl = isPublic
                ? thumbnailName ? `${apiUrl}/resource/thumbnail/${thumbnailName}` : "/no_image.webp"
                : imageUrls[id] || "/no_image.webp";

            return (
                <MediaItemCard key={id} fileName={fileName} thumbnailUrl={thumbnailUrl} isPublic={isPublic} fileNameUid={fileNameUid} />
            );
        })}
    </div>
);

const MediaItemCard = ({fileName, thumbnailUrl, isPublic, fileNameUid }: {fileName: string; thumbnailUrl: string; isPublic: boolean; fileNameUid: string; }) => (
    <div className={`mb-0 md:border p-[1px] md:p-1 rounded-lg shadow-sm md:mb-1 ${isPublic ? "md:border-gray-300" : "md:border-black-300 bg-red-950"}`}>
        <Link href={`/test/hlsTest/${fileNameUid}`} className="block">
            <Image
                src={thumbnailUrl || "/no_image.webp"}
                alt={fileName || "No image"}
                width={200}
                height={200}
                className="w-full h-auto rounded-md"
                unoptimized
            />
        </Link>
    </div>
);
