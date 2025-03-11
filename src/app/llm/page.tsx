
import { useState, useEffect } from 'react'

export default function Llm(){
    
    return (
        <div className='flex my-auto mx-auto justify-center h-full w-full'>
            <div className='flex flex-col h-full w-full mx-auto justify-center relative md:w-[40rem]'>
                <div className='text-center text-2xl font-semibold mx-auto pb-5'>
                    무엇을 도와드릴까요?
                </div>
                <div className='w-full flex justify-center'>
                    <form className='w-full'>
                        <div className='flex flex-center w-full cursor-text flex-col rounded-3xl border border-token-border-light px-3 py-1'>
                            <div className='flex items-center relative'>
                                <div className='flex min-h-[44px] pl-1 flex-1 min-w-0 max-w-full items-center pl-6'>
                                    확인

                                </div>
                                <button className='w-9 rounded-full bg-black h-9'>
                                👉
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <input/>

            </div>
        </div>
    )
}