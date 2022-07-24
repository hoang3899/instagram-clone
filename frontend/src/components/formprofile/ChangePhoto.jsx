import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../redux/userSlice';

const ChangePhoto = ({setIsChangePhoto}) => {

    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const fileRef = useRef();

    const [image, setImage] = useState(null);
    const [uploadingImage,setUploadingImage] = useState(false);

    const validateImage = async(e) => {
        const file = e.target.files[0];
        if(file.size >= 1048574){
            return alert('Max Size for Image is 1MB')
        } else {
            setImage(file);
        }
    }   

    const uploadImage = async() => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "dilfskqh");
        try {
            setUploadingImage(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/db3ycj3xc/image/upload",{

                    method: "post",
                    body: data
            });
            const urlData = await res.json();
            setUploadingImage(false);
            return urlData.url;

        } catch (error) {
            setUploadingImage(false);
            console.log(error);
        }
    } 
    
    useEffect (() => {
        if(image) {
            const updatePhoto = async() => {
                const url = await uploadImage(image);
                console.log(url);
        
                 
                const {data} = await axios.put('/api/users/update',{
                    _id: currentUser._id,
                    image: url
                });
                dispatch(loginSuccess(data))
                toast.success('Profile Image updated successfully!');
                setIsChangePhoto(false);
            };
          updatePhoto();
        }
    },[image]);

  return (
    <div className="markup-container">
        <div className="mar-box">
            <div className="mar-col">
                <div className="change-photo">
                    <h3 className="cp-title">Change Profile Photo</h3>
                </div>
                <div className="change-photo-body">
                    <button className="cpb-btn up-btn" onClick={() => fileRef.current.click()}>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</button>
                    <button className="cpb-btn cancel-btn" onClick={() => setIsChangePhoto(false)}>Cancel</button>
                    <form>
                        <input type="file" id="image_upload" accept="image/png, image/jpeg" hidden onChange={validateImage} ref={fileRef} />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePhoto