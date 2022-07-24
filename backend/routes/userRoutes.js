import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const UserRouter = express.Router();

// for user login
UserRouter.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                following: user.following,
                followers: user.followers,
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid Email or Password'}) 
});

// for Register user
UserRouter.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        image: req.body.image || "https://res.cloudinary.com/db3ycj3xc/image/upload/v1657135896/seller_dysamt.png",
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        following: user.following,
        followers: user.followers,
    })
});

//for update users
UserRouter.put('/update', async (req, res)=> {
    const user = await User.findById(req.body._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password)
        }
        if(req.body.image) {
            user.image = req.body.image
        }

        const updateUser = await user.save();
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            image: updateUser.image,
            isAdmin: updateUser.isAdmin,
            following: user.following,
            followers: user.followers,
        })
    } else {
        res.status(401).send({message: 'User not found!'})
    }
});


//for all users
UserRouter.get('/all' , async(req,res) => {

    const users = await User.find();
    res.send(users);
});

//get user by ID
UserRouter.get('/user/:id', async(req,res) => {
    const user = await User.findOne({_id: req.params.id});
    if(user) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            following: user.following,
            followers: user.followers,
    });
    } else {
        res.status(404).send({message: 'User not found'})
    }
})

//get followers
UserRouter.get("/:_id/followers",async (req, res) => {
      const { _id } = req.params;
      const { followers } = await User.findById({ _id }).select("followers");
      res.status(200).send(followers);
});

//get following
UserRouter.get("/:_id/following",async (req, res) => {
      const { _id } = req.params;
      const { following } = await User.findById({ _id }).select(
        "following"
      );
      res.status(200).send(following);
});

//check following
UserRouter.get("/checkfollower/:_id", async (req, res) => {
      const { profile: profile_id } = req.body;
      const { _id } = req.params;
  
      const profile = await User.findOne({
        _id: profile_id,
        "follower": _id,
      });
      if (profile) return res.status(200).send(true);
      return res.status(200).send(false);
 });

 //follow user
 UserRouter.put("/follow/:id",async (req, res) => {
      const { profile: profile_id } = req.body;
      let toBeFollowed = await User.findById({ _id: req.params.id });
      if (!toBeFollowed) return res.status(400).send("Bad Request");
      const userProfile = await User.findByIdAndUpdate(
        profile_id,
        {
          $push: {
            following: {
              _id: req.params.id
            },
          },
        },
        { new: true }
      );
      toBeFollowed = await User.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            followers: {
                _id: profile_id
            },
          },
        },
        { new: true }
      ).select({
        following: 1,
        followers: 1,
      });
      const updateProfile = await userProfile.save();
      await toBeFollowed.save();
      res.status(200).send({
        _id: updateProfile._id,
        name: updateProfile.name,
        email: updateProfile.email,
        image: updateProfile.image,
        isAdmin: updateProfile.isAdmin,
        following: updateProfile.following,
        followers: updateProfile.followers,
      });
});

//unfollow
UserRouter.put("/unfollow/:id" ,async (req, res) => {
      const { profile: profile_id } = req.body;
      let toBeFollowed = await User.findById({ _id: req.params.id });
      if (!toBeFollowed) return res.status(400).send("Bad Request");
      const updatedProfile = await User.findByIdAndUpdate(
        profile_id,
        {   
          $pull: { 
            following: {
                $in: req.params.id
            },
          },
        },
        { new: true }
      );
      toBeFollowed = await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            followers: {
                $in: profile_id
            },
          },
        },
        { new: true }
      ).select({
        following: 1,
        followers: 1,
      });
      const updateProfile = await updatedProfile.save();
      await toBeFollowed.save();
      res.status(200).send({
        _id: updateProfile._id,
        name: updateProfile.name,
        email: updateProfile.email,
        image: updateProfile.image,
        isAdmin: updateProfile.isAdmin,
        following: updateProfile.following,
        followers: updateProfile.followers,
      });
});
  
//get user by search query
UserRouter.get('/search', async(req,res) => {
 
  const query = req.query.q;
  try {
    const videos = await User.find({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json(videos);

  } catch (error) {
    res.status(200).send(false);
  }

})

//get name and image of user
UserRouter.get("/author/:_id",async (req, res) => {
  const { _id } = req.params;

  const profile = await User.findById({ _id: _id }).select(
    "name image"
  );
  res.status(200).send({
    name: profile.name,
    image: profile.image,
  });
});


  
export default UserRouter;
