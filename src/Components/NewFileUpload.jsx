import { useState } from 'react'
import axios from 'axios'


export default function NewFileUpload() {

    const [file, setFile] = useState()
    const [filesUploaded, setFilesUploaded] = useState(null)

   

    const submit = async event => {
       
        const formData = new FormData();
        formData.append("image", file)
        console.log(formData)
        await axios.post("http://localhost:3001/api/post", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((result) => { 
                async function getFile() {
                    console.log("szdxfcgvhbn", result.data)
                    const id = result.data._id
                    const response = await axios.get(`http://localhost:3001/api/post/${id}`);
                    console.log(response.data)
                    const imageBase64 = arrayBufferToBase64(response.data.imageData.data);
                    const src = `data:image/jpeg;base64,${imageBase64}`;
                    
                    setFilesUploaded(src);
            
                }
                getFile();
            })
            .catch((err)=> console.log(err))
            
    }
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    return (
        <div>
            <form onSubmit={submit} style={{ width: 650 }} >
                <input onChange={fileSelected} type="file" accept="image/*"></input>
                <button type="submit">Submit</button>
            </form>
            {filesUploaded && <img className="rounded" width="430" height="768" src={filesUploaded}></img>}


        </div>
    )
}
