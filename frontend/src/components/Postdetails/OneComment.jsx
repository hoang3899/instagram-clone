import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ShowInfo from '../headerpost/ShowInfo'
import EditComment from './EditComment'

const OneComment = ({comment,setCountComments}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [isOpenSubInfo,setIsOpenSubInfo] = useState(false);
  const [isOpenEditComment,setIsOpenEditComment] = useState(false);

  const [author, setAuthor] = useState({})

  const id = comment && comment.authorId;

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
    <div className="comment-container">
      <div>
        <h3 className="comment-name"  
        onMouseEnter={() => setIsOpenSubInfo(true)}
        onMouseLeave={() => setIsOpenSubInfo(false)}>
            <Link to="/">{author.name}: </Link>
        </h3> 
        <span className="comment-detail"> {comment.comment}</span>
      </div>
        {currentUser._id === comment.authorId && (
          <div className="btn-box">
          <div className="btn-comment" onClick={() => setIsOpenEditComment(true)}>
            <FontAwesomeIcon icon={faCaretDown}/>
          </div>
            {isOpenEditComment && <EditComment setIsOpenEditComment={setIsOpenEditComment} comment={comment} setCountComments={setCountComments}/>}
          </div>
        )}
      {isOpenSubInfo && <ShowInfo setIsOpenSubInfo={setIsOpenSubInfo} post={comment}/>}
    </div>
    </>
  )
}

export default OneComment