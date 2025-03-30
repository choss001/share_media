'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MediaItem {
    id: string;
    fileName: string;
    image: Uint8Array | null;
    thumbnailName: string;
    publicYn: string;
}

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                const res = await fetch(`${apiUrl}/mediaList`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch media list");
                }

                const data: MediaItem[] = await res.json();
                setMediaList(data);
            } catch (err) {
                console.error("Error fetching media list:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMediaList();
    }, [apiUrl]);

    return (
        <div className='min-h-dvh'>
            <div className="my-16 px-4">
                {loading ? (
                    <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
                        Loading...
                    </div>
                ) : (
                    <div className="columns-3 gap-0 md:columns-3 md:gap-8">
                        {mediaList.map(({ id, publicYn, thumbnailName, fileName }) => {
                            const isPublic = publicYn === "Y";
                            const thumbnailUrl = thumbnailName 
                                ? `${apiUrl}/${isPublic ? "resource" : "private"}/thumbnail/${thumbnailName}`
                                : "/no_image.webp";
                            const containerClass = `mb-0 md:border p-1 md:p-4 rounded-lg shadow-sm bg-white md:mb-8 
                                ${isPublic ? "md:border-gray-300" : "md:border-black-300 bg-red-950"}`;

                            return (
                                <div key={id} className={containerClass}>
                                    <Link href={`/test/mediaTest/${id}`} className="block">
                                        <Image
                                            src={thumbnailUrl}
                                            alt={fileName || "No image"}
                                            width={200}
                                            height={200}
                                            className="w-full h-auto rounded-md"
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}