"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await fs.writeFile(`./${file.name}`, buffer);

  redirect("/media");
}