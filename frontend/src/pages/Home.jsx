import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import MainHome from '../components/mainhome/MainHome';
import { useSelector } from "react-redux";
import './home.css'

const Home = () => {

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if(!currentUser){
        navigate('/login');
    }
  })  

  return (
    <>
      <Header />
      <MainHome />
    </>
  )
}

export default Home