import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { follow } from '../../redux/userSlice';

const OneFollower = ({followerId}) => {

    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);
    
   
    useEffect(() => {
        setLoading(true);
        const fetchData = async() => {
            try {
                const respone = await axios.get(`/api/users/user/${followerId}`);
                setUser(respone.data)
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        
    },[followerId]);

    const handlerFollow = async() => {
        await axios.put(`/api/users/follow/${followerId}`, {
            profile: currentUser._id
        })
        dispatch(follow(followerId));
    };

    const handlerUnFollow = async() => {
        await axios.put(`/api/users/unfollow/${followerId}`, {
            profile: currentUser._id
        })
        dispatch(follow(followerId));
    }

    if (loading) {
        return <>Loading...</>
    }
   
  return (
    <>
        <li className="onefollower-container">
            <div className="onefollower-box">
                <div className="of">
                    <div className="of-img">
                        <div className="ofi">
                            <Link to="/">
                                <img src={user.image} alt={user.name} />
                            </Link>
                        </div>
                    </div>
                    <div className="of-name">
                        <div className="ofn">
                            <span>
                                <Link to="/">
                                    <span className="ofn-title">{user.name}</span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="of-end">
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
        </li>
    </>
  )
}

export default  OneFollower