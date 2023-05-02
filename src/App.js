import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./components/Main"
import Header from "./components/Header"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import UserInfo from './components/UserInfo';
import UserSearch from './components/UserSearch'
import './App.css';



function App() {
  let site = {
    nav : [
      {"link": "/", "text": "Main", "class": "main"},
      {"link": "/sign-in", "text": "Sign in", "class": "sign-in"},
      {"link": "/sign-up", "text": "Sign up", "class": "sign-up"},
      {"link": "/user/info", "text": "User info", "class": "user-info"},
      {"link": "/user/search", "text": "User search", "class": "user-search"},
    ]
  }
  return (
    <div className='container'>
      <BrowserRouter>
        <Header data={site} />
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/user/info" element={<UserInfo/>} />
          <Route path="/user/search" element={<UserSearch/>} />
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
