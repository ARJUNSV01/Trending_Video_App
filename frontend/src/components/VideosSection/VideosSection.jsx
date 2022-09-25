import axios from "axios";
import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";

const VideosSection = () => {
  //     const[image,setImage]=useState('')
  //     const uploadVideos = ()=>{

  // const formData = new FormData();
  // formData.append("file",image[0])
  // formData.append("upload_preset","b9bd2n87")
  // axios.post("https://api.cloudinary.com/v1_1/groovy-planet/image/upload",formData).then((response)=>{
  // console.log(response)
  // }).catch((err)=>{
  //     console.log(err);
  // })
  // }
  //   return (
  //     <Container fluid className='mt-5'>
  //         <input
  //         type='file'
  //         onChange={(e)=>{setImage(e.target.files[0])}}
  //         />
  //         <button onClick={uploadVideos}>Upload </button>
  //     </Container>
  //   )
  const [video, setVideo] = useState();

  const uploadVideo = async() => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "b9bd2n87");

    try{
      const {data} =  await axios.post("https://api.cloudinary.com/v1_1/groovy-planet/video/upload",formData )
      const url = data.url
      console.log(data,'data')
      console.log(url,'ppp')
    //   const res = await axios.post()
    }catch(err){
        console.log(err)
    }
    
     
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
      />
      <input type="submit" value="Upload" onClick={uploadVideo} />
    </div>
  );
};

export default VideosSection;
