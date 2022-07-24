import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { follow } from '../../redux/userSlice'

const HeaderUser = ({posts,user}) => {
    
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const id = user._id;
    const handlerFollow = async() => {
        await axios.put(`/api/users/follow/${id}`, {
            profile: currentUser._id
        })
        dispatch(follow(id));
        toast.success(`You followed ${user.name}`)
    };

    const handlerUnFollow = async() => {
        await axios.put(`/api/users/unfollow/${id}`, {
            profile: currentUser._id
        })
        dispatch(follow(id));
        toast.error(`You unfollowed ${user.name}`)
    }


    return (
      <>
      <header className="pf-header">
          <div className="pfh-img">
              <div className="pfh-box">
                  <div className="pfh-container"> 
                      <button>
                          <img src={user.image} alt={user.name} className="img-pfh"/>
                      </button>
                  </div>
                  <form>
                      <input className="pfh-upimg" accept="image/jpeg, image/png" type="file"/>
                  </form>
              </div>
          </div>
          <section className="pfh-info">
              <div className="pfh-name"> 
                  <h2 className="pfh-title">{user.name}</h2>
                  <div className="pfh-edit">
                      <div className="pfhe">
                        {currentUser.following?.includes(user._id) ? (
                            <button className="ofe-btn ofebf" onClick={handlerUnFollow}>
                                <div className="ofeb">
                                    <div className="ofeb-follow">Following</div>
                                </div>
                            </button>
                        ) : (
                            <button className="ofe-btn" onClick={handlerFollow}>
                                <div className="ofeb">
                                    <div className="ofeb-follow">Follow</div>
                                </div>
                            </button>
                        )}
                      </div>
                  </div>
                  <div className="pfh-password">
                      <button type="button" className="pfh-btn">
                          <div className="pfhb">
                              <FontAwesomeIcon icon={faEllipsis}/>
                          </div>
                      </button>
                  </div>
              </div>
              <div className="pfh-br"><div></div></div>
              <ul className="pfh-body">
                  <li>
                      <div className="pfhb-info">
                          <span>{posts?.length} </span>
                          posts
                      </div>
                  </li>
                  <li>
                      <div className="pfhb-info">
                          <span>{user.followers?.length} </span>
                          followers
                      </div>
                  </li>
                  <li>
                      <div className="pfhb-info">
                          <span>{user.following?.length} </span>
                          following
                      </div>
                  </li>
              </ul>
          </section>
      </header>
      </>
    )
  }
  

export default HeaderUser