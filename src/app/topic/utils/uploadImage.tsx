export const uploadImage = async(file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/image`, {
    method: "POST",
    body: formData,
  });
  if(!res.ok){
    throw new Error(`Failed to upload : ${res.status}`);
  }

  const data = await res.json();
  debugger
  return data.contents;
  // return `${process.env.NEXT_PUBLIC_SPRING_API_URL}/${data.contents}`;
}