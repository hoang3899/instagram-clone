import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { follow } from '../../redux/userSlice';

const Markup = ({post, setIsOpenMarkup}) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handlerUnFollow = async() => {
        await axios.put(`/api/users/unfollow/${post.authorId}`, {
            profile: currentUser._id
        });
        setIsOpenMarkup(false);
        dispatch(follow(post.authorId));
    }
  return (
    <div className="markup-container">
        <div className="mar-box">
            <div className="mar-col">
                <button type="button" onClick={handlerUnFollow}>UnFollow</button>
                <button type="button"><Link to={`/posts/${post._id}`}>Go to post</Link></button>
                <button type="button" onClick={() => setIsOpenMarkup(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Markup