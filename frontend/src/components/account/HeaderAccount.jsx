import React, { memo } from 'react'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderAccount = ({posts,setIsOpenFollowers}) => {
    
    const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    <header className="pf-header">
        <div className="pfh-img">
            <div className="pfh-box">
                <div className="pfh-container"> 
                    <button>
                        <img src={currentUser.image} alt={currentUser.name} className="img-pfh"/>
                    </button>
                </div>
                <form>
                    <input className="pfh-upimg" accept="image/jpeg, image/png" type="file"/>
                </form>
            </div>
        </div>
        <section className="pfh-info">
            <div className="pfh-name"> 
                <h2 className="pfh-title">{currentUser.name}</h2>
                <div className="pfh-edit">
                    <div className="pfhe">
                        <Link to="/profile/edit">Edit Profile</Link>
                    </div>
                </div>
                <div className="pfh-password">
                    <button type="button" className="pfh-btn">
                        <div className="pfhb">
                            <FontAwesomeIcon icon={faGear}/>
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
                <li onClick={() => setIsOpenFollowers(true)}>
                    <div className="pfhb-info">
                        <span>{currentUser.followers?.length} </span>
                        followers
                    </div>
                </li>
                <li>
                    <div className="pfhb-info">
                        <span>{currentUser.following?.length} </span>
                        following
                    </div>
                </li>
            </ul>
        </section>
    </header>
    </>
  )
}

export default memo (HeaderAccount)