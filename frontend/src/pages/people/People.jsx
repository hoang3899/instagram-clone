import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Header from '../../components/header/Header'
import OnePeople from '../../components/onepeople/OnePeople'
import './people.css'

const People = () => {

    const [people, setPeople] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const respone = await axios.get("/api/users/all");
                setPeople(respone.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[])

  return (
    <>
        <Header />
        <section className="people-container">
            <div className="people-box">
                <div className="people-title">
                    <h4 className="pt">Suggested</h4>
                </div>
                <div className="pb">
                    <div  className="pb-box">
                        <div className="pb-users">
                            {people?.map((person,index) => (
                                <OnePeople person={person} key={index}/>
                            ))}
                        </div>  
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default People