'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from "@/app/topic/components/pagination";

interface BoardItem {
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
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0); // zero-based index

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/test/user`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!res.ok) {
      router.push('/signin');
    }
  }

  useEffect(() => {
    fetchBoard(currentPage);
  }, [currentPage]);

  const fetchBoard = async (page: number): Promise<void> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/board?page=${page}&size=10`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setBoardList(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

  return (
    <div className="md:p-6 md:pt-[50px] pt-[50px] max-w-5xl mx-auto h-dvh ">
      <h1 className="text-2xl font-bold text-center mb-6">Topic List</h1>

      <table className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-xs">
          <tr className="">
            <th className="md:py-4 md:px-6 py-1 px-2 text-center font-medium">User</th>
            <th className="md:py-4 md:px-6 py-1 px-2 text-center font-medium">Title</th>
            <th className="md:py-4 md:px-6 py-1 px-2 text-center font-medium">Created At</th>
            <th className="md:py-4 md:px-6 py-1 px-2 text-center font-medium">Hits</th>
            <th className="md:py-4 md:px-6 py-1 px-2 text-center font-medium">Edit</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((temp) => (
            <tr
              key={temp.id}
              className="hover:bg-gray-50 transition cursor-pointer"
              onClick={() => window.location.href = `/topic/${temp.id}/view`}
            >
              <td className="md:py-4 md:px-6 py-1 px-2 text-center text-xs md:text-sm">{temp.userName}</td>
              <td className="md:py-4 md:px-6 py-1 px-2 text-center text-xs md:text-sm">{temp.title}</td>
              <td className="md:py-4 md:px-6 py-1 px-2 text-center text-xs md:text-sm">{temp.createdAt}</td>
              <td className="md:py-4 md:px-6 py-1 px-2 text-center text-xs md:text-sm">{temp.hits}</td>
              <td className="md:py-4 md:px-6 py-1 px-2 text-center text-xs md:text-sm">
                <Link href={`/topic/${temp.id}/edit`}>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/topic/create">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow">
            Create New Post
          </button>
        </Link>
      </div>
    </div>
  );
}
