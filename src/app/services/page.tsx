'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MediaItem {
    id: string;
    fileName: string;
    image: Uint8Array | null;
    thumbnailName: string;
}

export default function Page() {
    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${apiUrl}/mediaList`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "omit",
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
        <div className="my-16 px-4">
            {loading ? (
                <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
                    Loading...
                </div>
            ) : (
                <div className="columns-3 gap-0 md:columns-3 md:gap-8">
                    {mediaList.map((item) => (
                        <div key={item.id} className="mb-0 md:border md:border-gray-300 p-1 md:p-4 rounded-lg shadow-sm bg-white md:mb-8">
                            <Link href={`/test/mediaTest/${item.id}`} className="block">
                                <Image
                                    src={item.thumbnailName ? `${apiUrl}/${item.thumbnailName}` : '/no_image.webp'}
                                    alt={item.fileName || "No image"}
                                    width={200}
                                    height={200}
                                    className="w-full h-auto rounded-md"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}