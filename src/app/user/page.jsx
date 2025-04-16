'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function User(){
    const [content, setContent] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchContent()
    }, [])

    async function fetchContent() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/test/user`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            credentials: "include",
        })
        if (res.ok) {
            const text = await res.text()
            setContent(text)
        }else{
            router.push('/signin')
        }
    }

    return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <div className="row-start-2">
                    {content && (<p>{content}</p>)}
                </div>
            </div>
    )

}