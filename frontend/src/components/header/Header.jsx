import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCompass, faHome, faPaperPlane, faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import SideBar from '../sidebar/SideBar'
import AddPost from './AddPost'
import { useSelector } from 'react-redux'
import Search from '../searchuser/Search'

const Header = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    
    const [isOpenAddPost,setIsOpenAddPost] = useState(false);
  return (
    <>  
        <div className="header-container">
            <div className="header-box">
                <div className="logo-container">
                    <div className="logo">
                        <Link to="/">
                            <div className="logo-col">
                                <div className="logo-title">
                                    <i className="logo-img">
                                    </i>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <Search />
                <div className="icon-container">
                    <div className="icons">
                        <div className="icon-box">
                            <div className="icon">
                                <Link to="/"><FontAwesomeIcon icon={faHome}/></Link>
                            </div>
                        </div>
                        <div className="icon-box">
                            <div className="icon">
                                <Link to="/"><FontAwesomeIcon icon={faPaperPlane}/></Link>
                            </div>
                        </div>
                        <div className="icon-box">
                            <div className="icon icon-post" onClick={() => setIsOpenAddPost(true)}>
                                <FontAwesomeIcon icon={faSquarePlus}/>
                            </div>
                        </div>
                        <div className="icon-box">
                            <div className="icon">
                                <Link to="/people"><FontAwesomeIcon icon={faCompass}/></Link>
                            </div>
                        </div>
                        <div className="icon-box">
                            <div className="icon">
                                <span onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
                                    {currentUser && <img src={currentUser.image} alt={currentUser.name} />}
                                </span>
                            </div>
                            <div className="sidebar-open"> 
                                {isOpenSidebar && <SideBar />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isOpenAddPost && <AddPost setIsOpenAddPost={setIsOpenAddPost}/>}
    </>
  )
}

export default Header