import React from "react";
import "./css/Header.css";

function Header(props){
    let link = React.createRef();
    let listItem = props.data.nav.map(item =>
        <a ref={link} className={item.class} key={item.link} href={item.link}>{item.text}</a>
    )

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
            document.querySelector(".user-info").style = "display: block;";
            document.querySelector(".user-search").style = "display: block;";
            document.querySelector(".sign-in").style = "display: none;";
            document.querySelector(".sign-up").style = "display: none;";
            console.log(result)
        }
      }

    userInfo();
    return(
        <>
            <div className="header-flex">
                {listItem}    
            </div>
        </>
    )
}

export default Header;