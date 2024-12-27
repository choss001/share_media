import Image from "next/image";
import Link from "next/link";

export default function Home() {

    const invoices = [
        { id: 1, customer: 'John Doe', amount: 150.75, dueDate: '2024-01-15', status: 'Paid' },
        { id: 2, customer: 'Jane Smith', amount: 200.50, dueDate: '2024-02-20', status: 'Unpaid' },
        { id: 3, customer: 'Michael Johnson', amount: 320.00, dueDate: '2024-03-05', status: 'Pending' },
        { id: 4, customer: 'Emily Davis', amount: 120.00, dueDate: '2024-04-10', status: 'Paid' },
        { id: 5, customer: 'James Brown', amount: 450.00, dueDate: '2024-05-25', status: 'Unpaid' },
        ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2">
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
