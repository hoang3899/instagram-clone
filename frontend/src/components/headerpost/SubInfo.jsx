import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { follow } from '../../redux/userSlice';

const SubInfo = ({setIsOpenSubInfo,post,author}) => {
    
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const id = post.authorId;
    const [isFollowers,setIsFollowers] = useState([]);
    const [isFollowing,setIsFollowing] = useState([]);
    const [isPosts, setIsPosts] = useState([]);

    const handlerUnFollow = async() => {
        await axios.put(`/api/users/follow/${id}`, {
            profile: currentUser._id
        })
        dispatch(follow(id));
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const respone = await axios.get(`/api/users/user/${id}`);
                setIsFollowers(respone.data.followers?.length);
                setIsFollowing(respone.data.following?.length);

                const res = await axios.get(`/api/posts/author/${id}`);
                setIsPosts(res.data?.length)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    },[id])
    
  return (
    <div className="sub-info"  
    onMouseEnter={() => setIsOpenSubInfo(true)}
    onMouseLeave={() => setIsOpenSubInfo(false)}>
        <div className="post-top">
            <header className="header-post">
                <div className="header-post-img">
                    <div className="img-container">
                        <span className="span-img">
                            <img  className="img-author" src={author.image} alt={author.name} />
                        </span>
                    </div>
                </div>
                <div className="author-name">
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
                <p>{isFollowers}</p>
                <p>followers</p>
            </div>
            <div className="sub-body-col">
                <p>{isFollowing}</p>
                <p>following</p>
            </div>
        </div>
        <div className="sub-footer">
            <button type="button" onClick={handlerUnFollow}>
                <span>Following</span>
            </button>   
        </div>
    </div>
  )
}

export default SubInfo