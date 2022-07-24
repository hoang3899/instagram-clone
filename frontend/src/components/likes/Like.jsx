import { faHeart, faComment , faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Like = ({post}) => {

    const { currentUser } = useSelector((state) => state.user);

    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [postisLiked, setPostisLiked] = useState(post.likes?.includes(`${currentUser._id}`));
    
    

    const handlerOnClick = async() => {
        if (postisLiked) {
            await axios.put(`/api/posts/dislike/${post._id}`, {
                profile: currentUser._id,
            })
            toast.error("You disliked this post")
            setLikeCount((prev) => prev - 1);
            return setPostisLiked(false);
            
        }
        await axios.put(`/api/posts/like/${post._id}`, {
            profile: currentUser._id,
        });
        toast.success("You liked this post!")
        setLikeCount((prev) => prev + 1);
        return setPostisLiked(true);
    }

   
  
  return (
    <>
    <section className="pf-icons">
        <span className="pf-iconbox">
            <button type="button" className="btn-post-header" onClick={handlerOnClick}>
                <div className="pf-icon">
                    <span>
                        {postisLiked ? <FontAwesomeIcon icon={faHeartCircleCheck}/>:(<FontAwesomeIcon icon={faHeart}/>)}
                    </span>
                </div>
            </button>
        </span>
        <span className="pf-iconbox">
            <button type="button" className="btn-post-header">
                <div className="pf-icon">
                    <span>
                        <FontAwesomeIcon icon={faComment}/>
                    </span>
                </div>
            </button>
        </span>
        <span className="pf-iconbox">
            <button type="button" className="btn-post-header">
                <div className="pf-icon">
                    <span>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </span>
                </div>
            </button>
        </span>
    </section>
    <section className="pf-likes">
        <div className="pfl">
            <span>{likeCount} likes</span>
        </div>
    </section>
    </>
  )
}

export default Like