import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    description:{type:String, required:true, minLength:5},
    authorId:{type: String, required: true},
    likes: [{type: String, default: ""}],
    comments: {
        type: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
          },
        ],
        default: [],
      },
    },
    {
        timestamps: true,
    }
);

let Post = mongoose.model("Post", postSchema);

export default Post;