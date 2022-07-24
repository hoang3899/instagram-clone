import React, { useState } from 'react'
import Footer from '../footer/Footer'
import './login.css'
import Carousel from 'react-img-carousel';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { loginSuccess } from '../../redux/userSlice';

require('react-img-carousel/lib/carousel.css');

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handlerSubmit = async(e) => {
        e.preventDefault();
        try {
            
            const {data} = await axios.post('/api/users/login',{
                email,
                password
            });
            dispatch(loginSuccess(data));
            toast.success('You have successfully logged in!')
            navigate('/')
        } catch (err) {
            toast.error('Email or password not valid!');
        }
    };


  return (
    <>
        <section className="login-container">
            <main className="login-rows">
                <article className="login-row">
                    <div className="login-col">
                        <div className="login-img-container">
                        <Carousel viewportWidth="250px" arrows={false} dots={false} lazyLoad={true} initialSlide={1} cellPadding={0} transition="slide" autoplay={true} easing="ease-out" >
                            <img src='https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png' alt=""/>
                            <img src='https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png' alt=""/>
                            <img src='https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png' alt=""/>
                            <img src='https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png' alt=""/>
                        </Carousel>,
                        </div>
                    </div>
                    <div className="content">
                        <div className="login-box">
                            <div className="header">
                                <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="Instagram" />
                            </div>
                            <div className="form-wrap">
                                <form className="form" onSubmit={handlerSubmit}>
                                    <div className="input-box">
                                    <input type="email" id="email" placeholder="Email" autoCorrect="off" name="email" required onChange={(e) => setEmail(e.target.value)} />
                                    </div>  
                                    <div className="input-box">
                                    <input type="password" name="password" id="password" placeholder="Password" autoCorrect="off" required onChange={(e) => setPassword(e.target.value)} />
                                    </div>  
                                    <span className="button-box">
                                        <button className="btn" type="submit" name="submit">Log in</button>
                                    </span>
                                </form>
                            </div>
                        </div> 
                        <div className="login-box">
                            <p className="text">Don't have an account?<Link to="/register">Sign up</Link></p>
                        </div>
                    </div>
                </article>
            </main>
        </section>
        <Footer />
    </>
  )
}

export default Login