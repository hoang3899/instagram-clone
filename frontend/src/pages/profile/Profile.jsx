import { faAddressBook, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Followers from '../../components/account/Followers';
import HeaderAccount from '../../components/account/HeaderAccount';
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts';
import './profile.css'

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user);

    const id = currentUser && currentUser._id;

    const [posts, setPosts] = useState([])
    const [isOpenFollowes,setIsOpenFollowers] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await axios.get(`/api/posts/author/${id}`);
                setPosts(respone.data)
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    },[id])

  return (
    <>
        <Header />
        <section className="pf-section">
            <div className="pf-container">
                <HeaderAccount posts={posts} setIsOpenFollowers={setIsOpenFollowers}/> 
                <div className="pf-body">
                    <Link to="/" className="pfb-a active">
                        <span className="pfb-title">
                            <FontAwesomeIcon icon={faTableCells}/>
                            <span> posts</span>
                        </span>
                    </Link>
                    <Link to="/" className="pfb-a">
                        <span className="pfb-title">
                            <FontAwesomeIcon icon={faBookmark}/>
                            <span> saved</span>
                        </span>
                    </Link>
                    <Link to="/" className="pfb-a">
                        <span className="pfb-title">
                            <FontAwesomeIcon icon={faAddressBook}/>
                            <span> tagged</span>
                        </span>
                    </Link>
                </div>
                <div>
                    {posts?.map((post) => (
                        <Posts key={post._id} post={post}/>
                    ))}
                </div>
            </div>
        </section>
        {isOpenFollowes && <Followers setIsOpenFollowers={setIsOpenFollowers}/>}
    </>
  )
}

export default Profile