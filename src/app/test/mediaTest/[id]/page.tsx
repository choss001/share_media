'use client'
import VideoPlayer from "../VideoPlayer";
import { useAuth } from '@/app/context/Authcontext';
import { useRouter } from 'next/navigation';

export default function VideoPage({ params}: {params: {id: string};}) {
  const id = params.id;
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;

  const deleteMedia = async () => {
    try {
      const response = await fetch(`${apiUrl}/deleteMedia/${id}`,{
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
      debugger
      console.log('response ok ' + response.ok)
      console.log('response.status ' + response.ok)

      if (response.ok){
        alert("Delete success!");
        router.push('/services'); // Replace '/media-list' with the actual list page path

      }else if(response.status == 401){
        alert("You do not have authorization");
      }else if(response.status == 500){
        alert("Delete failed because internal error try again later");
      }

    } catch (error) {
      alert("can't delete"+ error);
    }

  }

  if (!id) return <p>Loading video...</p>;

  return (
    <div className="justify-between h-full w-[50em]">
      <div className="mx-auto flex justify-center pt-[50px]">
        <VideoPlayer videoId={id} />
      </div>
      
      <div className="p-3">
        <div className="flex space-x-3 text-2xl">
          <button className="">
            🤍
          </button>
          <button>
            💬
          </button>
          <button className={isAuthenticated ? "block" : "hidden"} onClick={deleteMedia}>
            🗑️
          </button>
        </div> 
        <div className="pt-2 text-5xl">title!!</div>
      </div>
    </div>
  );
}
