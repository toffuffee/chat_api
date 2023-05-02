import React from 'react';
import { useNavigate } from "react-router-dom";
import "./css/UserInfo.css"

function UserInfo() {
    let nameUser = React.createRef();
    let lastName = React.createRef();
    let emailUser = React.createRef();
    let phoneUser = React.createRef();

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/sign-in");
    }

    async function userInfo() {
        let response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
          credentials: "include",
          mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      
        let result = await response.json();
        if (result.reason) {
          console.log("Вы не авторизовались")
        }
        else if (result) {
            nameUser.current.innerHTML = result.first_name;
            lastName.current.innerHTML = result.second_name;
            emailUser.current.innerHTML = result.email;
            phoneUser.current.innerHTML = result.phone;
        }
      }

      async function logOut() {
        let response = await fetch('https://ya-praktikum.tech/api/v2/auth/logout', {
          credentials: "include",
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify()
        });
        let result = await response.ok;
        if(result){
            document.querySelector(".user-info").style = "display: none;";
            document.querySelector(".user-search").style = "display: none;";
            document.querySelector(".sign-in").style = "display: block;";
            document.querySelector(".sign-up").style = "display: block;";
            handleClick()
            console.log("Вы вышли из аккаунта!")
        }
        else if(!result) {
            console.log("Вы ещё не вошли!")
        }
      }

      userInfo();


  return (
    <div className='user-card'>
        <h2 className="name" ref={nameUser}></h2>
        <div className="lastname" ref={lastName}></div>
        <div className="email" ref={emailUser}></div>
        <div className="phone" ref={phoneUser}></div>
        <input type="button" className='log-out-btn' value="Log out" onClick={logOut}/>
    </div>
  );
}

export default UserInfo;
