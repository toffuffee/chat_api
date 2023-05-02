import React from 'react';
import {useState} from "react"
import "./css/UserSearch.css"

function UserSearch() {
    let errorSerch = React.createRef();
    let errorSearchUser = React.createRef();
    const [login, saveLogin] = useState('');   
    const [listItem, setListItem] = useState([]);
    const loginInput = event => {
        saveLogin(event.target.value);
        console.log(event.target.value)
    }
  
    
    async function userSearch() {
        let userSearchRequest = {
          "login": login,
        };
    
        let response = await fetch('https://ya-praktikum.tech/api/v2/user/search', {
          credentials: "include",
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userSearchRequest)
        });
      
        let resultSearch = await response.json();
        if(!resultSearch){
            console.log(resultSearch)
        }
        else if(resultSearch){
            if(resultSearch.length == 0){
              errorSerch.current.innerHTML = "Нет таких пользователей!"
            }
            else {
              setListItem(resultSearch)
              errorSerch.current.innerHTML = ""
            }
            console.log(resultSearch)
        }  
    }


  return (
    <div className='user-search-container'>
        <input onChange={loginInput} value={login} type="text" placeholder="user's login"/>
        <button className='search-btn' onClick={userSearch}>Go</button>
        <div className='user-search-flex' ref={errorSearchUser}>
            {listItem.map(item =>
                <div key={item.id} className="user-search-card">
                  <div className='user-search-card-name'>{item.first_name}</div>
                  <div className='user-search-card-lastname'>{item.second_name}</div>
                  <div className='user-search-card-id'>{item.id}</div>
                  <div className='user-search-card-email'>{item.email}</div>
                </div>
            )}
        </div>
        <div className='error-search' ref={errorSerch}></div>
    </div>
  );
}

export default UserSearch;
