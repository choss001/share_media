import { z } from 'zod';

export const CreateBoardSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  id: z.number(),
});

export const validateFormData = (formData: FormData) => {
  console.log('id~!!!',formData.get('id'));
  console.log(typeof(formData.get('id')));
  return CreateBoardSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    id: Number(formData.get("id")),
  });
};