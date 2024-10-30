'use client'
import { useEffect, useState} from 'react';

export default function page(){

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/test")
        .then((res) => res.json())
        .then((data) => {
            setMessage(data.key)
            console.log(data)
        })
        .catch((err) => console.error("Error fetching message:", err));
    }, []);

    return(
        <>
            <p>service</p>
            {message}
        </>
    )
}