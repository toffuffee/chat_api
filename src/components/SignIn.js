import React from "react";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import "./css/SignIn.css"

function SignIn(){
    let errorReq = React.createRef();

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/user/info");
    }

    const [login, loginSave] = useState('');
    const [password, passwordSave] = useState('');

    const loginInput = event => {
        loginSave(event.target.value);
    }
    const passwordInput = event => {
        passwordSave(event.target.value);
    }

    async function signIn() {
        let signInRequest = {
          "login": login,
          "password": password,
        };
    
        let response = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
          credentials: "include",
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signInRequest)
        });
      
        let resultLogin = await response.ok;
        if(!resultLogin){
            errorReq.current.innerHTML = "Неверный логин или пароль!"
        }
        else if(resultLogin){
            handleClick();
            document.querySelector(".user-info").style = "display: block;";
            document.querySelector(".user-search").style = "display: block;";
            document.querySelector(".sign-in").style = "display: none;";
            document.querySelector(".sign-up").style = "display: none;";
            console.log("Вы вошли в аккаунт!")
        }  
    }
    
    return(
        <div className="body-sign-in">
            <div className="login-block">
                <h1>Sign in!</h1>
                <input type="text" className="login" placeholder="login" onChange={loginInput} value={login}/>
                <input type="password" className="password" placeholder="password" onChange={passwordInput} value={password}/>
                <input type="button" className="sign-in-btn" value="Go!" onClick={signIn}/>
            </div>
            <div className="error" ref={errorReq}></div>
        </div>
    )
}

export default SignIn;