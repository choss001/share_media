'use client'
import { useState } from 'react';

export default function Page(){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files == null){
            console.error("file is null");
            return null;
        }

        setSelectedFile(event.target.files[0]);
    };
    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:8080/upload/media", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const downloadUrl = await response.text();
                setUploadStatus(`File uploaded successfully! Access it here: ${downloadUrl}`);
            } else {
                setUploadStatus("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file.");
        }
    };

    return (
        <>
            <div className='my-[60px]'>
                <h1>Upload Media File</h1>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload</button>
                <p>{uploadStatus}</p>
            </div>

        </>
    )
}