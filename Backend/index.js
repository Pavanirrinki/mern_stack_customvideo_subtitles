const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const videomodel = require("./Videomodel.js")
const app = express()

app.use(cors({
    origin:"https://mern-stack-customvideo-subtitles-xvhv.vercel.app/"
}));
app.use(express.json());

mongoose.connect("mongodb+srv://pavankumarirrinki0123:pavankumarirrinki0123@cluster0.838wwg2.mongodb.net/?retryWrites=true&w=majority").
then(()=>console.log("DB Connected"));


app.post("/upload_video",async(req,res)=>{
    const {video,subtitles} = req.body;
    console.log("body",req.body)
    try{
const videowithsubtitles = await new videomodel({
    video: video,  // Include the video property
    subtitles: subtitles
})
await videowithsubtitles.save()
return res.status(200).send("Sucessfully uploaded video and Subtitles")
    }catch(error){
        return res.status(400).json({error:error.message})
    }
})

app.get("/uploaded_videowithsubtitles", async (req, res) => {
    try {
        const doc = await videomodel.findOne().sort({ _id: -1 }).exec();

        if (doc) {
            res.status(200).json(doc); 
        } else {
           
            res.status(404).json({ error: "No documents found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3030,(err,res)=>{
    if(!err){
        console.log("server connected")
    }else{
        throw err
    }
})