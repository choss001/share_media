import {uploadFile} from "./upload";

export default function page(){
    return(
        <>
            <div>this page work for media</div>
            <form action={uploadFile}>
                <div> this input for media</div>
                <input 
                    id="media"
                    name="file"
                    type="file"
                >
                </input>
                <button type="submit">send!</button>
            </form>

        </>
    )
}