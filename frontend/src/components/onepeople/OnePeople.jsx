import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { follow } from '../../redux/userSlice';

const OnePeople = ({person}) => {
    
    const { currentUser } = useSelector((state) => state.user);
    const dispatch= useDispatch();

    const id = person._id;
    const handlerFollow = async () => {
        await axios.put(`/api/users/follow/${id}`, {
            profile: currentUser._id
        })
        dispatch(follow(id));
        toast.success("You followed this user")
    };

    const handlerUnFollow = async () => {
        await axios.put(`/api/users/unfollow/${id}`, {
            profile: currentUser._id
        })
        dispatch(follow(id));
        toast.error("You unfollowed this user")
    }


  return (
    <>
         <div className="pb-user">
            <div className="header-post-img">
                <div className="img-container">
                    <span className="span-img">
                        <img  className="img-author" src={person.image} alt={person.name} />
                    </span>
                </div>
            </div>  
            <div className="author-name" >
                <span>
                    <Link to={`/${person._id}`}>{person.name}</Link>
                </span>
            </div>
            <div className="pb-button">
                {currentUser._id === person._id ? (
                    <button className="ofe-btn account-btn">
                        <div className="ofeb">
                            <div className="ofeb-follow">Account</div>
                        </div>
                    </button>
                ) :
                    (currentUser.following?.includes(person._id) ? (
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
                ))}
            </div>
        </div>
    </>
  )
}

export default OnePeople