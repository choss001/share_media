'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

type StateType = {
    username: string;
    password: string;
};

export default function Signup() {
    const router = useRouter()
    const [state, setState] = useState<StateType>({
        username: "",
        password: "",
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function handleSubmit() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/auth/signup`, {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            alert("User registered successfully")
            router.push("/")
        }
    }

    return (
        <div className='flex justify-center items-center min-h-dvh bg-gray-100 w-[50rem]'>
            <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-center text-gray-700 mb-6'>Sign Up</h1>
                <div className='space-y-4'>
                    <input 
                        className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        type='text' 
                        name='username' 
                        placeholder='Username' 
                        value={state.username}
                        onChange={handleChange}
                    />
                    <input 
                        className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        type='password' 
                        name='password' 
                        placeholder='Password' 
                        value={state.password}
                        onChange={handleChange}
                    />
                    <button 
                        className='w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
