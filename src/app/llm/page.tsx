'use client'
import { useState, useEffect, useRef } from 'react';
import LoadingDots from '../components/LoadingDots';
import { DiVim } from 'react-icons/di';

export default function Llm() {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when new messages are added
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, sender: 'user' };
        //setMessages((prev) => [...prev, userMessage]);
        setMessages((prev) => [...prev, { text: userMessage.text, sender: 'user' as const }]);

        setInputValue('');
        setLoading(true);

        try {
            const response = await fetch('https://a31.ddns.net:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: inputValue })
            });
            
            const data = await response.json();
            console.log(data)
            setMessages((prev) => [...prev, { text: data.response, sender: 'ai' }]);
        } catch (error) {
            console.error('Error fetching response:', error);
            setMessages((prev) => [...prev, { text: 'Error retrieving response', sender: 'ai' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col w-full bg-gray-100 items-center'
            style={{ height: 'calc(100dvh - 50px)' }}
        >
            {messages  != null && messages.length > 0 ?
                <div className='w-full items-center h-full flex-col flex justify-center'>
                    <div className='flex-1 flex flex-col overflow-y-auto p-4 space-y-3 max-w-[48rem] w-full'>
                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black'}`}> 
                                {msg.text}
                            </div>
                        ))}

                        {loading && 
                            <div className='h-full text-gray-500 items-center flex justify-center'> 
                                <LoadingDots/> 
                            </div>
                        }
                        <div ref={messageEndRef} />
                    </div>

                    <div className='max-w-[48rem] w-full p-4 bg-white border-t flex items-center rounded-full'>
                        <form onSubmit={handleSubmit} className='flex flex-1 items-center border rounded-full px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500'>
                            <input
                                type='text'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='메시지를 입력하세요...'
                                className='flex-1 outline-none bg-transparent text-lg'
                            />
                            <button type='submit' className='ml-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800' disabled={loading}>
                                {loading ? '⏳' : '✍'}
                            </button>
                        </form>
                    </div>
                </div>
            :
                <div className='w-full items-center h-full flex-col flex justify-center'>
                    <div className='mb-6 text-3xl'>조성식에 대한것을 물어보세요!</div>
                    <div className='max-w-[48rem] w-full p-4 bg-white border-t flex items-center rounded-full'>
                        <form onSubmit={handleSubmit} className='flex flex-1 items-center border rounded-full px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500'>
                            <input
                                type='text'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder='메시지를 입력하세요...'
                                className='flex-1 outline-none bg-transparent text-lg'
                            />
                            <button type='submit' className='ml-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800' disabled={loading}>
                                {loading ? '⏳' : '✍'}
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}