'use client'

export async function saveContent(
    formData: FormData,
    token: string | null,
    onSuccess: () => void,
    onError: (error: string) => void
){
    const content = formData.get('content') as string;
    const title = formData.get('title') as string;
    if (!content || !title) {
        return;
    }

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/content`,{
            method: "POST",
            body: JSON.stringify({ 
                contents: formData.get("content"),
                title: formData.get("title"),
                id : Number(formData.get("id")),
                userToken: token,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` ,
            }
        })
        if (res.ok){
            onSuccess();
        } else{
            const rawText = await res.text()
            onError(`Failed to save content: ${rawText}`);
        }
    }catch (error){
        onError('An unexpected error occured!');
        console.error('Error saving content:', error);

    }
}



export async function getContentById(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Prevent caching
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch content. Status: ${res.status}`);
      }
  
      const data = await res.json();
      return data; // Assume data has shape { content: "<p>...</p>" }
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }
  