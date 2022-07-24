import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../redux/userSlice';

const FormProfile = () => {
    
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState(currentUser && currentUser.name);
    const [email, setEmail] = useState(currentUser && currentUser.email);

    const handlerSubmit = async(e) => {
        e.preventDefault();
        try {
            const respone = await axios.put("/api/users/update", {
                _id: currentUser._id,
                name,
                email
            });
            dispatch(loginSuccess(respone.data));
            toast.success("You changed your profile successfully!")
            navigate('/profile')
        } catch (error) {
            console.log(error); 
        }
    }
  return (
    <>
        <form className="form-profile" onSubmit={handlerSubmit}>
            <div className="fp-name">
                <aside className="fp-title">
                    <label htmlFor="pepName">Name</label>
                </aside>
                <div className="fp-description">
                    <div className="fpd">
                        <input type="text" id="pepName" placeholder="Name..." className="fpd-input" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="fp-name">
                <aside className="fp-title">
                    <label htmlFor="pepEmail">Email</label>
                </aside>
                <div className="fp-description">
                    <div className="fpd">
                        <input type="email" id="pepEmail" placeholder="Email..." className="fpd-input" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                </div>
            </div>
            <div className="fp-footer">
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </>
  )
}

export default FormProfile