'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({totalPage }: {totalPage: number }) {
    const pathname = usePathname();
    console.log(`pathname!!!! ${pathname}`);
    const searchParams = useSearchParams();
    console.log(`searchParams!!!! ${searchParams}`);
    const currentPage = Number(searchParams.get('page')) || 1;
    console.log(`currentPage!!!! ${currentPage}`);
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        console.log(`parmas!!!! ${params}`);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }; 
    console.log(`createPageURL!!!! ${createPageURL(2)}`);


    return (
        <div>
            {totalPage}
        </div>
    );
}
