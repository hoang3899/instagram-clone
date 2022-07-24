import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddPost = ({setIsOpenAddPost}) => {
    
    const { currentUser } = useSelector((state) => state.user);

    const [description, setDescription] = useState("");

    const handlerAddPost = async(e) => {
        e.preventDefault();

        try {

            await axios.post("/api/posts/add",{
                description: description,
                authorId: currentUser._id,
            });
            toast.success('You added post successfully!');
            setIsOpenAddPost(false); 
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className="markup-container">
        <div className="ap-box">
            <div className="cancel-addpost" onClick={() => setIsOpenAddPost(false)}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            <div className="mar-box">
                <div className="mar-col">
                    <div className="ap-header">
                        <img src={currentUser.image} alt={currentUser.name}/>
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="ap-body">
                        <form onSubmit={handlerAddPost}>
                            <textarea placeholder="Write a description, you want..." onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                            <button type="submit" className="ap-btn">
                                Share
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AddPost