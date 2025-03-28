'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page(){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const router = useRouter();
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

        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            console.log(localStorage.getItem("tokek")+ 'test!!!')
            console.log(`${apiUrl}/upload/media`)
            const response = await fetch(`${apiUrl}/upload/media`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                const message = await response.text();
                if (message == "SUCCESS") {
                    router.push('/services'); // Replace '/media-list' with the actual list page path

                }else{
                    setUploadStatus(`${message}`);
                    setLoading(false);
                }
                
            } else {
                setLoading(false);
                setUploadStatus("Failed to upload file.");


            }
        } catch (error) {
            setLoading(false);
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file."+ error);
        }
    };

    return (
        <>
            <div className='my-[60px]'>
                {loading ? (
                    <div className='flex justify-center items-center h-full'>Loading</div>
                ) : (
                    <div className='flex flex-col justify-center items-center'>
                        <div className='m-5'>
                            {apiUrl}/upload/media
                            <h1>파일을 올려주세요</h1>
                        </div>
                        <input className="block" type="file" onChange={handleFileChange} />
                        <div className=''>
                            <button className="border-solid border-[1px] m-5 p-5" onClick={handleFileUpload}>Upload</button>
                        </div>
                        <p>{uploadStatus}</p>
                    </div>
                )}
            </div>

        </>
    )
}