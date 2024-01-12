import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css"
function Displayvideoitem() {
  const [videodata, setVideodata] = useState('');
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios.get("http://localhost:3030/uploaded_videowithsubtitles")
      .then((res) => {
        setVideodata(res.data);
        console.log(res.data, "res.data");
      })
      .catch((error) => console.log(error.message));
  }

  const videoload = (event) => {
    const currentTime = Math.floor(event.target.currentTime);
    console.log("currentTime",currentTime )
    const matchingSubtitle = videodata?.subtitles?.find(subtitle => currentTime >= subtitle.start && currentTime <= subtitle.end);
    setCurrentSubtitle(matchingSubtitle ? matchingSubtitle.subtitle : '');
  }

  return (
    <div style={{ position: 'relative',display:"flex",justifyContent:"center",marginTop:"50px"}}>
      {videodata && (
        <div style={{ position: 'relative'}}>
          <video id="video"width="680" height="380" controls onTimeUpdate={videoload} style={{ position: 'relative' }}>
            <source src={videodata?.video} type="video/mp4" />
            Your browser does not support the video tag.
           
          </video>
          <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", 
           padding: "10px", width: "80%",color:"white", textAlign: "center",marginBottom:"10px"}}>
            <p>{currentSubtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Displayvideoitem;
