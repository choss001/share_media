import axios from 'axios';

export default function PhotoPage() {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md   mt-[50px]'>
            <h1>Photo Upload Page</h1> 

        </div>
    )
    // Example function to upload images        
}
const uploadImages = async (images: any[]) => {
  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append('files', {
      uri: image.uri,
      name: image.fileName ?? `photo_${index}.jpg`,
      type: image.type ?? 'image/jpeg',
    } as any);
  });

  await axios.post(
    'http://YOUR_SERVER_IP:8080/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
