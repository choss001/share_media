'use client'
import { useRouter } from 'next/navigation';

export function saveContent(formData: FormData){
    const content = formData.get("content") as string;
    const router = useRouter();
    if (!content) {
        console.log(`maybe null? : ${content}`)
    }
    console.log(formData.get("content"));
    console.log(`title!! : ${formData.get("title")}`);

    const token = localStorage.getItem('token');
    console.info('action token ',token);
    postContent();
    async function postContent() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/content`,{
            method: "POST",
            body: JSON.stringify({ 
                contents: formData.get("content"),
                title: formData.get("title"),
                userToken: token,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        if (res.ok){
            const rawText = await res.text()
            console.log('wow : ', rawText)
            //router.push('/topic')
        } else{
            const rawText = await res.text()
            alert(`something wrong! ${rawText}`);
        }
    }
}
