import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
        authorId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            requried: true,
        },
        comment: { 
            type: String,
            required: true,
            minlength: 5,
        },
        post_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Post",
        }
    },
    {
        timestamps:true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;