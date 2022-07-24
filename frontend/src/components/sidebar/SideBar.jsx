import { faBookmark, faCircleUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../redux/userSlice'

const SideBar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const signouthandler = () => {
        dispatch(logout())
        toast.success('You signout successfully')
        navigate('/login');
    }

  return (
    <div className="sidebar-container">
        <div className="sidebar-top"></div>
        <div className="links-container">
            <Link to="/profile">
                <div className="link-box">
                    <div className="link-icon"><FontAwesomeIcon icon={faCircleUser}/></div>
                    <div className="link-title">
                        Profile
                    </div>
                </div>
            </Link>
            <Link to="/">
                <div className="link-box">
                    <div className="link-icon"><FontAwesomeIcon icon={faBookmark}/></div>
                    <div className="link-title">
                        Saved
                    </div>
                </div>
            </Link>
            <Link to="/">
                <div className="link-box">
                    <div className="link-icon"><FontAwesomeIcon icon={faGear}/></div>
                    <div className="link-title">
                        Setting
                    </div>
                </div>
            </Link>
            <hr className="dash"/>
            <div>
                <div className="sidebar-logout"  onClick={signouthandler}>
                    LogOut
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideBar