"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Authcontext";
import axios from "axios";

export default function Page() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [publicYn, setPublicYn] = useState("Y");

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
        setProgress(0);
        setUploadStatus("");

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("publicYn", publicYn);

        try {
            console.log(`formData ${selectedFile}`)
            const response = await axios.post(`${apiUrl}/upload/media`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // Important for session cookies
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                },
                timeout: 6000000,
            });

            if (response.data === "SUCCESS") {
                router.push("/services");
            } else {
                setUploadStatus(response.data);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus(`Error uploading file. ${error}`);
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

                {/* Public/Private Radio Buttons */}
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

                {/* Upload Progress Bar */}
                {progress > 0 && (
                    <div className="mb-4">
                        <div className="h-4 bg-gray-200 rounded">
                            <div className="h-4 bg-blue-500 rounded" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-sm text-center mt-1">{progress}% uploaded</p>
                    </div>
                )}

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
