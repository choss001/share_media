'use client'

export function saveContent(formData: FormData){
    const content = formData.get("content") as string;
    if (!content) {
        console.log(`maybe null? : ${content}`)
    }
    console.log(formData.get("content"));


    fetchProfile();

    async function fetchProfile() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap`,{
            method: "POST",
            body: JSON.stringify({ 
                contents: formData.get("content"),
                test: "wow",
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        if (res.ok){
            const json = await res.json()
            console.log('wow : ', json)
        } else{
            console.log(res);
        }
    }
}
