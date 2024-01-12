const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    video:{
        type:String,
        required:true
    },
    subtitles:{
        type:Array,
        required:true
    }
})

const videoschema = mongoose.model("Video",videoSchema);
module.exports= videoschema