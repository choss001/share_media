'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LayoutAuthenticated(props){
    const [profile, setProfile] = useState();
    const router = useRouter();

    useEffect(() => {
        fetchProfile()
    }, [])
    async function fetchProfile() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/test/profile`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.ok){
            const json = await res.json()
            setProfile(json)
        } else {
            router.push("/signin")
        }
    }

    function logout() {
        localStorage.removeItem("token")
        router.push("/")
    }

    return(
        <div className=''>
            <div className=''>
                <p>Signed in as: {profile && profile.username}</p>
                <p><button onClick={logout}>Log out</button></p>
            </div>
            {props.children}
        </div>
    )
}