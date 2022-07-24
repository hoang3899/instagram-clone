import express from 'express';
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

const PostRouter = express.Router();

//gat all posts 
PostRouter.get("/all", async (req, res) => {
  const posts = await Post.find();

  if (!posts) return res.sendStatus(404);
  res.status(200).send(posts);
});


//gat all posts by id of follower
PostRouter.get("/allposts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find();
  
  if (!posts) return res.sendStatus(404);
  const authorId = await User.findById({ _id: id }).select("following"); 

  const allposts = posts.filter((item) => authorId.following.some((key) => item.authorId === key))

  res.status(200).send(allposts);
});

// A route for getting a single Post based on post id
PostRouter.get("/post/:id", async (req, res) => { 
      const { id } = req.params;
      const post = await Post.findById({ _id: id });

      if (!post) {return res.sendStatus(404);
      } else {
        res.status(200).send(post);
      }
});

//get all posts by authorId
PostRouter.get('/author/:id', async(req,res) => {
    const post = await Post.find({authorId: req.params.id});
    if(post) {
        res.send(post);
    } else {
        res.status(404).send({message: 'No Post of this Author'})
    }
});

//get quantity of all posts by authorId
PostRouter.get('/number/:id', async(req,res) => {
    const post = await Post.find({authorId: req.params.id});
    if(post) {
        res.json(post.length);
    } else {
        res.status(404).send({message: 'No Post of this Author'})
    }
});

//create post 
PostRouter.post('/add', async(req,res) => {
    const newPost = new Post(req.body);
    
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch {
        console.log("Error")
    }
});


//for update post
PostRouter.put('/update', async (req, res)=> {
    const post = await Post.findById(req.body._id);
    if (post) {
        post.description = req.body.description || post.description;
        post.authorId = req.body.authorId || post.authorId;
      
        const updatePost = await post.save();
        res.send({
            _id: updatePost._id,
            description: updatePost.description,
            authorId: updatePost.authorId,
            likes: post.likes.length,
        })
    } else {
        res.status(401).send({message: 'Product not found!'})
    }
});


//check Like
PostRouter.get("/:id/check/like", async (req, res) => {
      const { profile: profile_id } = req.body;
      const { id } = req.params;
      const check = await Post.findOne({
        _id:id,
        likes: { $in: profile_id },
      });
      if (check) return res.status(200).send(true);
      return res.status(200).send(false);
});


//like
PostRouter.put("/like/:post_id",async (req, res) => {
      const { post_id } = req.params;
      const { profile: profile_id } = req.body;
      const user = await User.findOne({ _id: profile_id });
      if (!user) {
        return res.status(404).send("Invalid Request")
      }else{
          let post = await Post.findOne({
            _id: post_id,
            likes: { $in: profile_id }, 
          }).select("_id");
          if (post) {
            return res.status(400).send("Already Liked")
          }else{
            post = await Post.findByIdAndUpdate(
              { _id: post_id },
              { $push: { likes: { _id: profile_id } } },
              { new: true }
            );
            res.status(200).send({ likes: post.likes.length })
          };
      }
});


// A route where a user can dislike a  Post
PostRouter.put("/dislike/:id",async (req, res) => {
      const { id: post_id } = req.params;
      const { profile: profile_id } = req.body;
      let { likes } = await Post.findOne({ _id: post_id }).select("likes");
      const isLiked = likes.find((item) => {
        return item == profile_id;
      });
      if (isLiked) {
        const post = await Post.findByIdAndUpdate(
          { _id: post_id },
          { $pull: { likes: { $in: profile_id } } },
          { new: true }
        )
        return res.status(200).send({
          ...post._doc,
          likes: post.likes.length,
        });
      } else {
        res.status(404).send("No Yet Liked")
      }
});

//delete Post
PostRouter.delete('/delete/:id', async (req, res) => {

    try {

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json('Post has been deleted'); 

    } catch (error) {
        console.log("Can't be deleted")
    }
})

// A route to comment on a  Post
PostRouter.put(
  "/comment/:id", async (req, res) => {
    const { comment } = req.body;
    const { profile: profile_id } = req.body;
    const profile = await User.findById({ _id: profile_id }).select(
      "_id name"
    );
    let post = await Post.findById(req.params.id);

    let newComment = new Comment({
      authorId: profile._id,
      comment,
      post_id: post._id,
    });

    await newComment.save();
    newComment = await Comment.findById(newComment._id);
    post.comments.push(newComment._id);
    await post.save();
   
   
    res.status(200).send(newComment);
});

//delete comments
PostRouter.delete("/:_id/comment/:comment_id", async (req, res) => {
    const { _id, comment_id } = req.params;
     await Comment.findByIdAndRemove({
      _id: comment_id,
    });
    await Post.findByIdAndUpdate(
      _id,
      {
        $pull: { comments: comment_id },
      },
      { new: true }
    );
    res.sendStatus(200);
});

// A route for getting all comments based on post id
PostRouter.get("/comment/:id",async (req, res) => {
    
    const comments = await Comment.find({ post_id: req.params.id })

    return res.status(200).send(comments);
});



export default PostRouter;