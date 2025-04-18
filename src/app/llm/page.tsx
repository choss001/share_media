'use client';
import { useState, useEffect, useRef } from 'react';
import LoadingDots from '../components/LoadingDots';

export default function Llm() {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
    
        const userMessage = { text: inputValue, sender: 'user' } as const;
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setLoading(true);
    
        try {
            const url = 'https://a31.ddns.net/chat'
            // const url = 'http://localhost:8000/chat'
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: inputValue }),
            });
    
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let aiMessage = '';
            setMessages((prev) => [...prev, { text: '', sender: 'ai' }]);
    
            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;
                aiMessage += decoder.decode(value, { stream: true });
    
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { text: aiMessage, sender: 'ai' };
                    return updated;
                });
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { text: 'Error streaming response', sender: 'ai' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full bg-gray-100 items-center h-dvh">
            {messages.length > 0 ? <ChatWindow messages={messages} loading={loading} messageEndRef={messageEndRef} /> : <WelcomeMessage />}
            <ChatInput inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} loading={loading} />
        </div>
    );
}

function ChatWindow({ messages, loading, messageEndRef }
    : { messages: { text: string; sender: 'user' | 'ai' }[], loading: boolean, messageEndRef: React.RefObject<HTMLDivElement> }) {
    return (
        <div className="w-full flex flex-col flex-1 items-center overflow-y-auto">
            <div className="flex-1 flex flex-col p-4 space-y-3 max-w-[48rem] w-full mt-[3rem]">
                {messages.map((msg, index) => (
                    <div key={index} className={`max-w-xs md:max-w-[40em] p-3 rounded-lg break-words ${msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black'}`}>
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <div className="h-full text-gray-500 items-center flex justify-center">
                        <LoadingDots />
                    </div>
                )}
                <div ref={messageEndRef} />
            </div>
        </div>
    );
}

function WelcomeMessage() {
    return (
        <div className="w-full flex flex-col items-center h-[45dvh] justify-end">
            <div className="mb-6 text-2xl text-black">조성식에 대한 것을 물어보세요!</div>
        </div>
    );
}

function ChatInput({ inputValue, setInputValue, handleSubmit, loading }: { inputValue: string, setInputValue: (value: string) => void, handleSubmit: (e: React.FormEvent) => void, loading: boolean }) {
    return (
        <div className="max-w-[48rem] w-full p-4 bg-white border-t flex items-center rounded-full">
            <form onSubmit={handleSubmit} className="flex flex-1 items-center border rounded-full px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 outline-none bg-transparent text-lg text-black"
                />
                <button type="submit" className="ml-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800" disabled={loading}>
                    {loading ? '⏳' : '✍'}
                </button>
            </form>
        </div>
    );
}
