import { faAddressBook, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import HeaderUser from '../../components/profileuser/HeaderUser';

const User = () => {

    const params = useParams();
    const { id } = params;

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await axios.get(`/api/posts/author/${id}`);
                setPosts(respone.data);

                const res = await axios.get(`/api/users/user/${id}`);
                setUser(res.data);

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
                <HeaderUser posts={posts} user={user}/> 
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
    </>
  )
}


export default User