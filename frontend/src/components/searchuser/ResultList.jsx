import React from 'react'
import Result from './Result'

const ResultList = ({data,loading,isSearchUser}) => {
    
  return (
    <div className="result-list">
        <div className="result-container">
            <div className="rct"></div>
            <div className="rc-box">
                <div className="rcb">
                    <Result data={data} loading={loading} isSearchUser={isSearchUser}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResultList