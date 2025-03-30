'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/Authcontext';

export default function Page() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(""); // For the title
    const [content, setContent] = useState(""); // For the content
    const [publicYn, setPublicYn] = useState("Y"); // For private/public publicYn
    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files == null) {
            console.error("File is null");
            return;
        }
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile || !title || !content) {
            alert("Please provide title, content, and select a file!");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", title); // Append title
        formData.append("content", content); // Append content
        formData.append("publicYn", publicYn); // Append publicYn (public/private)

        try {
            const response = await fetch(`${apiUrl}/upload/media`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const message = await response.text();
                if (message === "SUCCESS") {
                    router.push('/services'); 
                } else {
                    setUploadStatus(message);
                }
            } else {
                setUploadStatus("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-xl font-semibold text-center mb-4">Upload a File</h1>

                {/* Title Input */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter the title"
                    />
                </div>

                {/* Content Input */}
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter the content"
                    ></textarea>
                </div>

                {/* File Upload Input */}
                <div className="relative w-full mb-4">
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="file-upload"
                        className="block w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-600 cursor-pointer hover:bg-gray-50"
                    >
                        {selectedFile ? selectedFile.name : "Choose a file"}
                    </label>
                </div>

                {/* publicYn (Private/Public) Radio Buttons */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Visibility</label>
                    <div className="flex items-center space-x-4">
                        <div>
                            <input
                                type="radio"
                                id="public"
                                name="publicYn"
                                value="Y"
                                checked={publicYn === "Y"}
                                onChange={() => setPublicYn("Y")}
                                className="mr-2"
                                disabled={!isAuthenticated}
                            />
                            <label htmlFor="public" className="text-gray-700">Public</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="private"
                                name="publicYn"
                                value="N"
                                checked={publicYn === "N"}
                                onChange={() => setPublicYn("N")}
                                className="mr-2"
                                disabled={!isAuthenticated}
                            />
                            <label htmlFor="private" className="text-gray-700">Private</label>
                        </div>
                    </div>
                </div>

                {/* Upload Button */}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition-all"
                    onClick={handleFileUpload}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        "Upload"
                    )}
                </button>

                {/* Status Message */}
                {uploadStatus && (
                    <p className="text-sm text-center text-red-500 mt-3">{uploadStatus}</p>
                )}
            </div>
        </div>
    );
}
