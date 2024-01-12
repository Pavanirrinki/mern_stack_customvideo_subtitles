import React, { useState,useEffect} from 'react';
import axios from 'axios';
import Displayvideoitem from './Displayvideoitem';
function UploadVideo() {
  const [videos,setVideos] = useState('')
  const [subtitles, setSubtitles] = useState([
    {
      start: 0,
      end: 0,
      subtitle: ''
    }
  ]);
const [showinputs,setShowinputs] = useState(true);
const [videouploading,setVideoUploading] = useState(true)
  const handleAddClick = () => {
    setSubtitles((prevSubtitles) => [
      ...prevSubtitles,
      { start: 0, end: 0, subtitle: '' }
    ]);
  };

  const changeHandler = (e, index) => {
   
    const { name, value } = e.target;
    setSubtitles((prevSubtitles) => {
      const newSubtitles = [...prevSubtitles];
      newSubtitles[index] = { ...newSubtitles[index], [name]: value };

      return newSubtitles;
    });
  };

  const handleSubtitleLog = async () => {
    if(videos !== ''&& subtitles !== ''){
  await  axios.post("https://mern-stack-customvideo-subtitles.vercel.app/upload_video", {
      video: videos,  // Make sure to include the video property
      subtitles: subtitles,
    })
    .then((response) => {
      console.log(response.data.videowithsubtitles);
      setSubtitles([{ start: 0, end: 0, subtitle: '' }]);
    })
    .catch((error) => console.error(error));
    setTimeout(()=>{
    setShowinputs(false)
  },2000)
}else{
  alert("please fill all fields")
}
  };
  
const videochange =async (event)=>{
  setVideoUploading(false)
  const selectedFile = event.target.files[0];
  const formdata =new FormData();
  formdata.append("file",selectedFile);
  formdata.append("upload_preset",'xenymzuf');
 await axios.post("https://api.cloudinary.com/v1_1/dvbvggl5f/video/upload",formdata).
  then((res)=>{
  setVideos(res.data.url);
  setVideoUploading(true)
  console.log(res.data.url,'res.data.url')}).catch((error)=>console.log(error))

   
}
console.log(videos)
  return (
    <>
    {showinputs ?
    <div style={{display:"flex",justifyContent:"space-between",margin:'0 100px'}}>
      <div>
        <input type="file"  onChange={videochange}/>
      {subtitles.length>0 && subtitles?.map((subtitle, index) => (
        <div key={index}>
       <p style={{fontSize:"14px",fontWeight:"bold",color:"red",margin:"0"}}>(Note :- start time and end time will be calculated as 1 sec 1,10 sec 10,1 minute 15sec 75)</p> 
          <label>Start time</label>
          <br />
          <input
            type="number"
            name="start"
            onChange={(e) => changeHandler(e, index)}
            value={subtitle.start}
          />
          <br />
          <label>End time</label>
          <br />
          <input
            type="number"
            name="end"
            onChange={(e) => changeHandler(e, index)}
            value={subtitle.end}
          />
          <br />
          <label>Subtitle</label>
          <br />
          <input
            type="text"
            name="subtitle"
            onChange={(e) => changeHandler(e, index)}
            value={subtitle.subtitle}
          />
          <br />
        </div>
      ))}
      <button onClick={handleAddClick}>Add</button>
      {videouploading ?
      <button onClick={handleSubtitleLog}>Submit Subtitles</button>:<button>video uploading......</button>}
      </div>
      <div >
        {subtitles && subtitles?.map((data,index)=>{
          return(
<div>
 <h1 style={{margin:"0px"}}> {index}</h1>
start time :{data.start}<br />
End time :{data.end}<br />
Subtitle: {data.subtitle}
  </div>
          )
        })}
        
      </div>
    </div>:<Displayvideoitem />}
    </>
  );
}

export default UploadVideo;
