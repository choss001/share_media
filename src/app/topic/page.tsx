'use client';
import Link from "next/link";
import { useState, useEffect } from 'react';


interface BoardItem{
    id: number;
    title: string;
    contents: string;
    createdAt: string;
    userName: string;
    hits: number;
}

export default function Home() {

    const invoices = [
        { id: 1, customer: 'John Doe', amount: 150.75, dueDate: '2024-01-15', status: 'Paid' },
        { id: 2, customer: 'Jane Smith', amount: 200.50, dueDate: '2024-02-20', status: 'Unpaid' },
        { id: 3, customer: 'Michael Johnson', amount: 320.00, dueDate: '2024-03-05', status: 'Pending' },
        { id: 4, customer: 'Emily Davis', amount: 120.00, dueDate: '2024-04-10', status: 'Paid' },
        { id: 5, customer: 'James Brown', amount: 450.00, dueDate: '2024-05-25', status: 'Unpaid' },
        ];

    const [boardList, setBoardList] = useState<BoardItem[]>([]);

    //check your are user
    useEffect(() => {
        fetchBoard()
    }, [])
    const fetchBoard = async (): Promise<void> => {
        try{
          const token = localStorage.getItem("token");
          fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/board`,
              {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                      
                  },
              }
          )
          .then((res) => res.json())
          .then((data:BoardItem[]) => {
            setBoardList(data)
            console.log(data)
          })
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

  return (

    <div className="">

        {boardList.map((temp) => (
            <div key={temp.id} className="w-[950px] bg-red-50 m-auto">
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
                    <tbody>
                            <tr 
                                className="cursor-pointer hover:bg-gray-200"
                                onClick={() => window.location.href = '/'}
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
                </table>
            </div>

        ))}
      <div className="">
        <div className="bg-gray-50 p-2 rounded-lg">
            <table className="text-gray-900 min-w-full">
                <thead className="rounded-lg text-left text-sm">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium">
                            Customer
                        </th>
                        <th scope="col" className="px-4 py-5 font-medium">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-5 font-medium">
                            Amount
                        </th>
                        <th scope="col" className="px-4 py-5 font-medium">
                            Date
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {invoices?.map((invoice) => (
                        <tr
                            key={invoice.id}
                            className="border-b py-3 text-sm last-of-type:border-none "
                        >
                            <td className="px-4 py-2">{invoice.customer}</td>
                            <td className="px-4 py-2">${invoice.amount.toFixed(2)}</td>
                            <td className="px-4 py-2">{invoice.dueDate}</td>
                            <td className="px-4 py-2">{invoice.status}</td>
                            <td className="px-4 py-2">
                                <Link href={`/topic/update`}>
                                    <div>update</div>
                                    
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      <div className="row-start-3">
        <Link
            href={`/topic/create`}>
            create
        </Link>
      </div>
    </div>
  );
}
