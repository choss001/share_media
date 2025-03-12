'use client'
import { useState } from 'react';

export default function Llm() {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, sender: 'user' };
        //setMessages((prev) => [...prev, userMessage]);
        setMessages((prev) => [...prev, { text: userMessage.text, sender: 'ai' as const }]);

        setInputValue('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputValue })
            });
            
            const data = await response.json();
            setMessages((prev) => [...prev, { text: data.response, sender: 'ai' }]);
        } catch (error) {
            console.error('Error fetching response:', error);
            setMessages((prev) => [...prev, { text: 'Error retrieving response', sender: 'ai' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col h-screen w-full bg-gray-100'>
            <header className='w-full py-4 bg-white shadow-md text-center font-semibold text-xl'>
                Chat with AI
            </header>
            
            <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                {messages.map((msg, index) => (
                    <div key={index} className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}> 
                        {msg.text}
                    </div>
                ))}
                {loading && <div className='text-gray-500 self-start'>Typing...</div>}
            </div>
            
            <div className='w-full p-4 bg-white border-t flex items-center'>
                <form onSubmit={handleSubmit} className='flex flex-1 items-center border rounded-full px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500'>
                    <input
                        type='text'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='메시지를 입력하세요...'
                        className='flex-1 outline-none bg-transparent text-lg'
                    />
                    <button type='submit' className='ml-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800' disabled={loading}>
                        {loading ? '⏳' : '👉'}
                    </button>
                </form>
            </div>
        </div>
    );
}