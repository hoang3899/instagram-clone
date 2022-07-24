import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HeaderOnePost = () => {
    const { currentPost } = useSelector((state) => state.post);
    
    const [author, setAuthor] = useState({})

    const id = currentPost && currentPost.authorId;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const respone = await axios.get(`/api/users/author/${id}`);
                setAuthor(respone.data)

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[id]); 

  return (
    <>
    <div className="post-top">
    <header className="header-post">
        <div className="header-post-img">
            <div className="img-container">
                <span className="span-img">
                    <img  className="img-author" src={author.image} alt={author.name} />
                </span>
            </div>
        </div>
        <div className="author-name" >
            <span>
                <Link to={`/${currentPost.authorId}`}>{author.name}</Link>
            </span>
            <span>&#8226; <button className="pds-btn">Following</button></span>
        </div>
    </header>
    <div className="header-post-end">
        <button type="button" className="btn-post-header" >
            <div className="btn-post">
                <FontAwesomeIcon icon={faEllipsis}/>
            </div>
        </button>
    </div>
    </div>
    </>
  )
}

export default HeaderOnePost