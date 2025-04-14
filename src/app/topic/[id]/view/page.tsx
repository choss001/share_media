import { notFound } from "next/navigation";
 // Import client-side component

export default async function EditPage({ params }: { params: { id: string } }) {
  // Fetch data server-side
  const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/${params.id}`, {
    cache: "no-store",
  });

  //update hits
  console.log('why!!!');
  fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/board/hits/${params.id}`,{
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
  })
  .then((res) => {
    console.log('why!!!');
    if(!res.ok) {
      console.log(res);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  })
  .catch((err) => {
    console.error(`err = ${err}`)
  });
  
  if (!res.ok) {
    notFound(); // Show 404 page if the topic is not found
  }

  const topic = await res.json();

}