'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import Layout from '../components/layout-authenticated'

type StateType = {
    username: string;
    password: string;
};

export default function SignIn(){
    const router = useRouter()

    const [state, setState] = useState<StateType>({
        username: '',
        password: ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } =  e.target;
        setState((preState) => ({
            ...preState,
            [name]: value
        }))
    }

    async function handleSubmit() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/auth/signin`, {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.ok) {
            const json = await res.json()
            console.log('token = ', json.token)
            localStorage.setItem('token', json.token)
            router.push('/')
        } else {
            alert('Bad credentials')
        }
    }

    return (
            <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
                <h1 className='row-start-2'>
                    <div className='flex flex-col'>
                        <input 
                            className='text-center'
                            type='text'
                            name='username'
                            placeholder='username'
                            value={state.username}
                            onChange={handleChange}
                        />
                        <input 
                            className='text-center'
                            type='password'
                            name='password'
                            placeholder='password'
                            value={state.password}
                            onChange={handleChange}
                        />
                        <button 
                            className=''
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </h1>
            </div>
    )

}