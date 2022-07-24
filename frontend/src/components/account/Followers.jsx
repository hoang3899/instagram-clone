import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';
import OneFollower from './OneFollower';

const Followers = ({setIsOpenFollowers}) => {

    const { currentUser } = useSelector((state) => state.user);
    
  return (
    <>
    <div className="account-followers">
        <div className="af-container">
            <div className="af-box">
                <div className="af-col">
                    <div className="afc">
                        <div>
                            <div className="afc-header"> 
                                <div className="afch-title">
                                    <h1 className="afcht">
                                        <div>
                                            Followers
                                        </div>
                                    </h1>
                                </div>
                                <div className="afch-cancel">
                                    <div className="afchc">
                                        <button type="button" onClick={() => setIsOpenFollowers(false)}>
                                            <div>
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="afc-body">
                            <ul className="afcb">
                                <div>
                                    {currentUser.followers?.map((followerId,index) => (
                                        <OneFollower followerId={followerId} key={index}/>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Followers