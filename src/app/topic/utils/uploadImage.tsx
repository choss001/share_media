export const uploadImage = async(file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_URL}/tiptap/image`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return `${process.env.NEXT_PUBLIC_SPRING_API_URL}/${data.contents}`;
}