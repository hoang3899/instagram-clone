import { faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dislike, fetchSuccess, like } from '../../redux/postSlice'
import { fetchSuc } from '../../redux/commentSlice'
import Header from '../header/Header'
import HeaderOnePost from './HeaderOnePost'
import ShowComments from './ShowComments'
import { toast } from 'react-toastify'

const PostDetails = () => {
  
    const { currentUser } = useSelector((state) => state.user);
    const { currentPost } = useSelector((state) => state.post);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    const params = useParams();
    const {id} = params;

    const _id = currentUser && currentUser._id;
    const [countComments,setCountComments] = useState(0);

    useEffect(() => {
        setLoading(true);
        const getDetailsPost = async () => {
            try{
              const respone = await axios.get(`../api/posts/post/${id}`)
              
              const res = await axios.get(`../api/posts/comment/${id}`);
              
              dispatch(fetchSuccess(respone.data));
              setCountComments(respone.data.comments?.length);
              dispatch(fetchSuc(res.data));
              setLoading(false);
            } catch(err){
              console.log(err);
            }
          };
          getDetailsPost();
    },[dispatch,id,_id])
    

    const handlerOnClick = async() => {
      if (currentPost.likes?.includes(currentUser?._id)) {
            await axios.put(`../api/posts/dislike/${currentPost._id}`, {
                profile: currentUser._id,
            })
          toast.warning("You disliked this post")
          return dispatch(dislike(currentUser._id))
      }
      await axios.put(`../api/posts/like/${currentPost._id}`, {
        profile: currentUser._id,
        })
      toast.success("You liked this post")
      return dispatch(like(currentUser._id))
    }

  if(loading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
        <Header /> 
        <div className="postdetails-container">
          <article className="pds-container">
              <HeaderOnePost />
              <div className="post-row-body">
                  {currentPost?.description}
              </div>
              <div className="post-row-footer" >
                <section className="pf-icons">
                  <span className="pf-iconbox">
                      <button type="button" className="btn-post-header" onClick={handlerOnClick}>
                          <div className="pf-icon">
                              <span>
                                {currentPost.likes?.includes(currentUser?._id) ? <FontAwesomeIcon icon={faHeartCircleCheck}/>:(<FontAwesomeIcon icon={faHeart}/>)}
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
                        <span>{currentPost.likes?.length} likes</span>
                    </div>
                </section>
                <section className="pf-comments">
                    <div className="pfc">
                        Wiew all
                        <span> {countComments} </span>
                        comments
                    </div>
                </section>
                <ShowComments setCountComments={setCountComments} />
              </div>
          </article>
        </div>
    </>
  )
}

export default PostDetails