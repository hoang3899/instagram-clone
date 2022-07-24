import { faFaceGrinWink} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Like from '../likes/Like'
import HeaderPost from '../headerpost/HeaderPost'
import Markup from '../header/Markup'

const Posts = ({post}) => {
  
    const [isOpenMarkup, setIsOpenMarkup] = useState(false); 
  return (
    <>
        <article className="post-container">
            <div className="post-col">
                <div className="post-row-header">
                    <HeaderPost post={post} setIsOpenMarkup={setIsOpenMarkup}/>
                </div>
                <div className="post-row-body">
                    {post.description}
                </div>
                <div className="post-row-footer">
                    <Like post={post}/>
                    <section className="pf-comments">
                        <div className="pfc">
                            Wiew all
                            <span> {post.comments.length} </span>
                            comments
                        </div>
                    </section>
                    <section className="pfc-add">
                        <div>
                            <form className="pfc-form">
                                <div><FontAwesomeIcon icon={faFaceGrinWink}/></div>
                                <textarea placeholder="Add a comment..." className="pfc-text"></textarea>
                                <button type="submit" className="pfc-btn">
                                    <div>Post</div>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </article>
        {isOpenMarkup && <Markup post={post} setIsOpenMarkup={setIsOpenMarkup}/>}
    </>
  )
}

export default Posts