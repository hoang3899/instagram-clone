import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SubInfo from './SubInfo'

const HeaderPost = ({post,setIsOpenMarkup}) => {
    const [isOpenSubInfo,setIsOpenSubInfo] = useState(false)

    const [author, setAuthor] = useState({});

    const id = post && post.authorId;

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
            <div className="header-post-img" 
            onMouseEnter={() => setIsOpenSubInfo(true)}
            onMouseLeave={() => setIsOpenSubInfo(false)}>
                <div className="img-container">
                    <span className="span-img">
                        <img  className="img-author" src={author.image} alt={author.image} />
                    </span>
                </div>
            </div>
            <div className="author-name" onMouseOver={() => setIsOpenSubInfo(false)}>
                <span>
                    <Link to={`/${post.authorId}`}>{author.name}</Link>
                </span>
            </div>
        {isOpenSubInfo && <SubInfo setIsOpenSubInfo={setIsOpenSubInfo} post={post} author={author}/>}
        </header>
        <div className="header-post-end">
            <button type="button" className="btn-post-header" onClick={() => setIsOpenMarkup(true)}>
                <div className="btn-post">
                    <FontAwesomeIcon icon={faEllipsis}/>
                </div>
            </button>
        </div>
    </div>
    </>
  )
}

export default HeaderPost