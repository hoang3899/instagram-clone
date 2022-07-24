import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../loading/Loading'

const Result = ({data,loading,isSearchUser}) => {
    
    if(loading){
        return (
            <div className="result-list-open">
                <div  className="rlo">
                    <Loading />
                </div>
            </div>
        )
    }
    if(isSearchUser.length === 0){
        return (
            <div className="result-list-open">
                <div  className="rlo">
                    Please enter name for search
                </div>
            </div>
        )
    }
    if(data.length === 0){
        return (
            <div className="result-list-open">
                <div className="rlo">
                    No results found.
                </div>
            </div>
        )
    }
  return (
    <>
         {data?.map((user) => (
            <div key={user._id}>
                <Link to={`${user._id}`}>
                    <div className="rcb-box">
                    <div className="header-post-img">
                        <div className="img-container">
                            <span className="span-img">
                                <img  className="img-author" src={user.image} alt={user.name} />
                            </span>
                        </div>
                    </div>
                    <div className="author-name">
                        <div>
                            <div className="rcb-name">{user.name}</div>
                        </div>
                    </div>
                    </div>
                </Link>
            </div>
        ))}
    </>
  )
}

export default Result