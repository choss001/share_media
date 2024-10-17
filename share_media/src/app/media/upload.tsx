"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  console.log("this is form data" ,formData);
  const file = formData.get("file") as File;
  console.log(file)
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await fs.writeFile(`./${file.name}`, buffer);

  revalidatePath("/");
}