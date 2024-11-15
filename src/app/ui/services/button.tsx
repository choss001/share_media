import Image from 'next/image'

export function DeleteMedia ({ id, onDelete }: { id: string; onDelete: () => void }) {


    const apiUrl = process.env.NEXT_PUBLIC_SPRING_API_URL;
    const deleteMedia = async () => {
        try{
            const response = await fetch(`${apiUrl}/deleteMedia/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok){
                console.log('media deleted successfully');
                onDelete();
            }else throw new Error('Failed to delete the invoice');
        }catch(error){
            console.error("Error deleting media:", error);
        }
    }
    return (
        <button onClick={deleteMedia} className="rounded-md border p-2 hover:bg-gray-100">
            <span className="sr-only">Delete</span>
            <Image 
                src='/trash-can-icon.avif'
                width={30}
                height={200}
                alt='trash'>
            </Image>
        </button>
    );
  }