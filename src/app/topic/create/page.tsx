'use server'
import Image from "next/image";

export default function Home() {
  function formAction(){

  }
  return (
    <div className="flex-grow p-6 h-screen">
      <div className="flex bg-gray-50 w-min-full items-center">
        <form action={formAction}>
        </form>
        
      </div>
    </div>
  );
}
