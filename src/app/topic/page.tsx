'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from "@/app/topic/components/pagination";


interface BoardItem{
    id: number;
    title: string;
    contents: string;
    createdAt: string;
    userName: string;
    hits: number;
}

export default function Home() {
    const router = useRouter();
    const [boardList, setBoardList] = useState<BoardItem[]>([]);

    //check whether authenticated or not
    useEffect(() => {
        fetchContent()
    }, [])
    async function fetchContent() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/user`,{
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!res.ok) {
            router.push('/signin')
        }
    }


    //check your are user
    useEffect(() => {
        fetchBoard()
    }, [])
    const fetchBoard = async (): Promise<void> => {
        try {
            const token = localStorage.getItem("token");
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/board`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const data: BoardItem[] = await res.json();
            setBoardList(data);
        } catch (error) {
            console.error("Error fetching board:", error);
        }
    };

  return (

    <div className="">
        <table className="text-gray-900 min-w-full">
            <thead className="rounded-lg text-center text-sm"> 
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium">
                        Title
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                        User
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                        Createdat
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                        Hits
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                        Edit
                    </th>
                </tr>
            </thead>
            {boardList.map((temp) => (
                <tbody key={temp.id} className="bg-white">
                    <tr 
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => window.location.href = `/topic/${temp.id}/view`}
                    >
                        <td className="px-4 py-2">{temp.userName}</td>
                        <td className="px-4 py-2">{temp.title}</td>
                        <td className="px-4 py-2">{temp.createdAt}</td>
                        <td className="px-4 py-2">{temp.hits}</td>
                        <td className="px-4 py-2 flex items-center justify-center">
                            <Link href={`/topic/${temp.id}/edit`}>
                                <button 
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Edit
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>

            ))}
        </table>
        this is pagination test
        <Pagination totalPage={5}/>
        
        <div className="flex items-center justify-center">
            <Link href="/topic/create">
                <button>create</button>
            </Link>
        </div>
    </div>
  );
}
