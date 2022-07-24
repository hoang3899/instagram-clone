import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ChangePhoto from '../../components/formprofile/ChangePhoto'
import FormProfile from '../../components/formprofile/FormProfile'
import Header from '../../components/header/Header'

const EditProfile = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [isChangePhoto, setIsChangePhoto] = useState(false);
  return (
    <>
        <Header />
        <section className="edit-profile">
            <div className="ep">
                <article className="ep-container">
                    <div className="ep-header">
                        <div className="eph-img">
                            <div className="ephi">
                                <button className="ephi-btn" type="button">
                                    <img src={currentUser.image} alt={currentUser.name} className="ephi-img"/>
                                </button>
                                <form>
                                    <input type="file" accept="image/png, image/jpeg" className="ephi-input" />
                                </form>
                            </div>
                        </div>
                        <div className="eph-name">
                            <h1 className="eph-title">{currentUser.name}</h1>
                            <button type="button" className="ephn-btn" onClick={() => setIsChangePhoto(true)}>
                            Change profile photo
                            </button>
                        </div>
                    </div>
                    <FormProfile />
                </article>
            </div>
        </section>
        {isChangePhoto && <ChangePhoto setIsChangePhoto={setIsChangePhoto}/>}
    </>
  )
}

export default EditProfile