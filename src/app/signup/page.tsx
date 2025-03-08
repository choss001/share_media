'use client'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

type StateType = {
    username: string;
    email: string;
    password: string;
};

export default function Signup(){
    const router = useRouter()
    const [state, setState] = useState<StateType>({
        username: "",
        email: "",
        password: "",
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setState((preState) => ({
            ...preState,
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
            alert("user registered success")
            router.push("/")

        }
    }

    return (
            <div className=''>
                <h1 className=''>Sign Up</h1>
                <div className=''>
                    <input 
                        className='' 
                        type='text' 
                        name='username' 
                        placeholder='username' 
                        value={state.username}
                        onChange={handleChange}
                    />
                    <input 
                        className='' 
                        type='text' 
                        name='email' 
                        placeholder='email' 
                        value={state.email}
                        onChange={handleChange}
                    />
                    <input 
                        className='' 
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
            </div>
    )
}
