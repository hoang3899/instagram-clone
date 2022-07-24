import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteComment } from '../../redux/commentSlice';

const EditComment = ({setIsOpenEditComment,comment,setCountComments}) => {

    const { currentUser } = useSelector((state) => state.user);
    const { currentPost } = useSelector((state) => state.post);
    const dispatch = useDispatch();


  const handerDeleteComment = async() => {
      try{
        await axios.delete(`/api/posts/${currentPost._id}/comment/${comment._id}`,{
          profile:currentUser._id
        })
        dispatch(deleteComment(comment._id));
        toast.warning("You deleted the comment!")
        setCountComments(prev => prev - 1)
      } catch(e){
        toast.error("You don't delete the comment!")
      } 
  }

  
  return (
    <div className="ec-container">
        <div className="ec-box">
            <button type="button" onClick={handerDeleteComment}>Delete Comment</button>
            <button type="button" onClick={() => setIsOpenEditComment(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default EditComment