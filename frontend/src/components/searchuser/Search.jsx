import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ResultList from './ResultList';

const Search = () => {

    const [loading,setLoading] = useState(false);
    const [isSearchUser,setIsSearchUser] = useState("")
    const [isResultList,setIsResultList] = useState([]);

    const [clickedOutside, setClickedOutside] = useState(false);
    
    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(false);
        }
    };

    const handleClickInside = () => setClickedOutside(true);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    useEffect(() =>{
        setLoading(true);
        const fetchSearch = async() => {
            const res = await axios.get(`/api/users/search?q=${isSearchUser}`);
            setIsResultList(res.data)
        }
        if(isSearchUser.length >= 1) fetchSearch();
        setLoading(false);
    },[isSearchUser])

  return (
    <>
        <div ref={myRef} className="search-form" onClick={handleClickInside }>
            <input autoCapitalize='none' placeholder='Search' type="Search"   className="input-search"  onChange={(e)=>setIsSearchUser(e.target.value)}/>
            {clickedOutside && <ResultList data={isResultList} loading={loading} isSearchUser={isSearchUser}/>}
        </div>
    </>
  )
}

export default Search