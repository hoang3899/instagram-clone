import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import Posts from '../posts/Posts';
import { useSelector } from 'react-redux';

const MainHome = () => {
    const { currentUser } = useSelector((state) => state.user);
    
    const [posts,setPosts] = useState([]);
    useEffect(() => {

        const fetchData = async () => {

                const result = await axios.get(`/api/posts/allposts/${currentUser._id}`);
                setPosts(result.data);

        }
        fetchData();
    },[currentUser._id]);
    
  return (
    <div className="mainhome-container" >
        <section className="mainhome-row">
            <div className="mainhome-col">
                <div className="mh-top"></div>
                <div className="mh-carousel" >
                    <div className="carousel-container">
                    </div>
                </div>
                <div className="posts-container">
                    <div>
                        <div className="posts-box">
                            {posts.map((post) => (
                                <Posts post={post} key={post._id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainhome-col"></div>
        </section>
    </div>
  )
}

export default MainHome