'use client'
import Image from "next/image";
import { FaBeer } from 'react-icons/fa';
import { AiFillAccountBook } from "react-icons/ai";
import Link from "next/link";
import { z } from 'zod';
import { useFormState } from "react-dom";
import { init } from "next/dist/compiled/webpack/webpack";
import { redirect } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const customers = [{id:1, value:"test1"}, {id:2, value:"test2"},{id:3, value:"test3"} ]
const customerValues = customers.map(customer => customer.value) as [string, ...string[]];
const CreateBoardSchema = z.object({
  title: z.enum(customerValues, {invalid_type_error: "you have to fill in the title"}),
  content: z.string({ invalid_type_error: "you have to fill in the content" })
    .min(1,{ message: "you have to fill in the content"}),
});

type State = {
  errors?:{
    title?: string[],
    content?: string[],
  };
  message: string | null;
}
export default function CreateTopic() {
  function createBoardState(state: State, formData: FormData){
    const content = formData.get('content');
    const title = formData.get('title');
    console.log(`content : ${content}`)
    console.log(`title : ${title}`)

    const validatedFields = CreateBoardSchema.safeParse({
      title: title,
      content: content,
    })
    if (!validatedFields.success){
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Mssing Fields. Failed to Create Invoices',
      }
    }
    redirect('/topic')

  }
  const initialState: State = {errors: {}, message: null,};
  const [state, formAction] = useFormState(createBoardState, initialState);
  type Board = z.infer<typeof CreateBoardSchema>;

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write your content here...</p>',

  });


  return (
    <form action={formAction}>
      <div className="p-6 h-screen">
        <div className="bg-gray-50 w-min-full p-6 items-center">
          <label className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="title"
              name="title"
              className="pl-10"
              defaultValue=""
            >
              <option value="" disabled>
                Select a customer

              </option>
              {customers.map((customer) => (
                <option key={customer.id}>
                  {customer.value}
                </option>
              ))}
            </select>
            <AiFillAccountBook className="absolute left-3 top-1/2 h-[18px] w-[18px] text-gray-500
              -translate-y-1/2"/>
          </div>
          <div className="text-red-500">
            {state.errors?.title}
          </div>
          {/* Invoice Amount */}
          <label className="mt-2 block">
            Write contents
          </label>
          <div className="relative mt-2">
            <input
              id="content"
              name="content"
              type="text"
              placeholder="content"
              className="peer"
            >
            </input>
            <div className="text-red-500">
              {state.errors?.content}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Link href="/"></Link>
          <button className="text-white h-10 rounded-lg bg-blue-500 px-4 hover:bg-blue-400">Create text</button>
        </div>
        <div className="text-red-500">
          {state.message}
        </div>
        <EditorContent editor={editor} />;
      </div>
    </form>
  );
}
