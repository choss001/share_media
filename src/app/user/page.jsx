'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Layout from '../components/layout-authenticated'

export default function User(){
    const [content, setContent] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchContent()
    }, [])

    async function fetchContent() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/user`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.ok) {
            const text = await res.text()
            setContent(text)
        }else{
            router.push('/signin')
        }
    }

    return (
            <div className=''>
                <h1 className=''>
                    {content && (
                        <p>{content}</p>
                    )}
                </h1>
            </div>

    )

}