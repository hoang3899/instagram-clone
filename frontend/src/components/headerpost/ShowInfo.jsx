import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { follow } from '../../redux/userSlice';

const ShowInfo = ({setIsOpenSubInfo,post}) => {
    
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const id = post.authorId;
    const [isFollowers,setIsFollowers] = useState([]);
    const [isFollowing,setIsFollowing] = useState(0);
    const [isPosts, setIsPosts] = useState(0);


    const [author, setAuthor] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                
                const respone = await axios.get(`/api/users/author/${id}`);
                setAuthor(respone.data)

            } catch (error) {
                console.log(error)
            }
        };
        fetch();
    },[id]); 


    useEffect(() => {
        const fetchData = async() => {
            try {
                const respone = await axios.get(`../api/users/user/${id}`);
                setIsFollowers(respone.data.followers);
                setIsFollowing(respone.data.following?.length);

                const res = await axios.get(`../api/posts/number/${id}`);
                setIsPosts(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    },[id]);

    const handlerUnFollow = async () => {
        try {
            await axios.put(`../api/users/unfollow/${id}`, {
                profile: currentUser._id
            })
            dispatch(follow(id));
            toast.warning("You unfollowed this user")
        } catch (error) {
            toast.error("You dont unfollowed this user") 
        }
      
    }

    const handlerFollow = async () => {
        try {
            await axios.put(`../api/users/follow/${id}`, {
                profile: currentUser._id
            })
            dispatch(follow(id));
            toast.success("You followed this user")
        } catch (error) {
            toast.error("You dont followed this user") 
        }
       
    }   
    

  return (
    <div className="sub-info" 
        onMouseEnter={() => setIsOpenSubInfo(true)}
        onMouseLeave={() => setIsOpenSubInfo(false)}
    >
        <div className="post-top">
            <header className="header-post">
                <div className="header-post-img">
                    <div className="img-container">
                        <span className="span-img">
                            <img  className="img-author" src={author.image} alt={author.name} />
                        </span>
                    </div>
                </div>
                <div className="author-name" onMouseOver={() => setIsOpenSubInfo(false)}>
                    <span>
                        <Link to="/">{author.name}</Link>
                    </span>
                </div>
            </header>
        </div>
        <div className="sub-body">
            <div className="sub-body-col">
                <p>{isPosts}</p>
                <p>posts</p>
            </div>
            <div className="sub-body-col">
                <p>{isFollowers.length}</p>
                <p>followers</p>
            </div>
            <div className="sub-body-col">
                <p>{isFollowing}</p>
                <p>following</p>
            </div>
        </div>
        <div className="sub-footer">
            {post.authorId !== currentUser._id ? (
                currentUser.following?.includes(post.authorId) ? (
                    <button type="button" onClick={handlerUnFollow} >
                        <span>Following</span>
                    </button> 
                ) : (
                    <button type="button" onClick={handlerFollow} className="btn-info1">
                        <span>Follow</span>
                    </button>   
                      
                )
                   
                ) :
                (
                    <button type="button" className="btn-info">
                        <span>Account</span>
                    </button>   
                )
            }
           
        </div>
    </div>
  )
}

export default  ShowInfo