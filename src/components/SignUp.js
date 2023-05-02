import React from "react";
import {useState} from "react"
import { useNavigate } from "react-router-dom";


function SignUp(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/user/info");
    }

    const [name, saveName] = useState('');
    const [lastname, saveLastname] = useState('');
    const [login, loginSave] = useState('');
    const [password, passwordSave] = useState('');
    const [email, emailSave] = useState('');
    const [number, setNumber] = useState('');

    const loginInput = event => {
        loginSave(event.target.value);
    }

    const passwordInput = event => {
        passwordSave(event.target.value);
    }

    const nameInput = event => {
        saveName(event.target.value);
    }

    const lastnameInput = event => {
        saveLastname(event.target.value);
    }

    const emailInput = event => {
        emailSave(event.target.value);
    }

    const numberInput = event => {
        setNumber(event.target.value);
    }

    async function signUp() {

        let signUnRequest = {
            "first_name": name,
            "second_name": lastname,
            "login": login,
            "email": email,
            "password": password,
            "phone": number,
        };
      
        let response = await fetch('https://ya-praktikum.tech/api/v2/auth/signup', {
          credentials: "include",
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signUnRequest)
        });
      
        let resultLogin = await response.ok;
        if(resultLogin){
            document.querySelector(".user-info").style = "display: block;";
            document.querySelector(".user-search").style = "display: block;";
            document.querySelector(".sign-in").style = "display: none;";
            document.querySelector(".sign-up").style = "display: none;";
            handleClick();
            console.log("Вы зарегестрировались!")
        }  
    }

    return(
        <>
           <div className="body-sign-in">
            <div className="login-block">
                <h1>Sign up!</h1>
                <input type="text" className="first-name" onChange={nameInput} value={name} placeholder="First name"/>
                <input type="text" className="second-name" onChange={lastnameInput} value={lastname} placeholder="Last name" />
                <input type="text" className="login" onChange={loginInput} value={login} placeholder="Login" />
                <input type="email" className="email" onChange={emailInput} value={email} placeholder="Email" />
                <input type="password" className="password" onChange={passwordInput} value={password} placeholder="Password" />
                <input type="number" className="phone" onChange={numberInput} value={number} placeholder="Phone Number" />
                <input type="button" className="sign-in-btn" value="Go!" onClick={signUp} />
                </div>
            </div>
        </>
    )
}

export default SignUp;