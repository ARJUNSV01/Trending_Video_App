import mongoose from 'mongoose';

const VideoSchema = mongoose.Schema({
    url:{type: 'string',required:true},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },

},{timeStamps:true})

export default mongoose.model("Video",VideoSchema);