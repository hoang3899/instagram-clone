import { faFaceGrinWink } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCommment } from '../../redux/commentSlice';
import OneComment from './OneComment';

const ShowComments = ({setCountComments}) => {
      
    const { currentUser } = useSelector((state) => state.user);
    const { currentPost } = useSelector((state) => state.post);
    const { currentComment } = useSelector((state) => state.comment);
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    
    const handlerComment = async (e) => {
        e.preventDefault();
        try{
                
            const {data} = await axios.put(`../api/posts/comment/${currentPost._id}`,{
                profile: currentUser._id,
                comment: comment
            });
                dispatch(createCommment(data));
                toast.success('You commented post');
                setCountComments((prev) => prev + 1);
                setComment('')
            } catch(e){
                toast.error('You did not comment on post ')
            }
    }
  return (
    <>
    <section className="pfc-add">
        {currentPost.comments?.length > 0 && (
            <div className="comments-box">
            {currentComment?.map((comment)=> (
                <OneComment key={comment._id} comment={comment} setCountComments={setCountComments} />
            ))}
        </div>
        )}
        <div>
            <form className="pfc-form" onSubmit={handlerComment}>
                <div><FontAwesomeIcon icon={faFaceGrinWink}/></div>
                <textarea placeholder="Add a comment..." className="pfc-text" onChange={(e) => setComment(e.target.value)} value={comment} ></textarea>
                <button type="submit" className="pfc-btn">
                    Post
                </button>
            </form>
        </div>
    </section>
    </>
  )
}

export default ShowComments