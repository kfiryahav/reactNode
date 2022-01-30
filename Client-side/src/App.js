import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from './components/signUp';
import Login from './components/login';
import NavBar from './components/navBar';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';
import Protected_rout_user from './components/common/protected_rout_user';
import Protected_rout_business from './components/common/protected_rout_business';
import User_info from './components/user_info';
import Add_card from './components/bussines/add_card';
import Edit_card from './components/bussines/edit_card';
import Favorite_cards from './components/bussines/favorite_cards';
import Cards from './components/cards';
import { authantication } from './services/authantication';
import { URL, api_call } from './services/api_calls'


function App() {
  // diffrennt states from another components
  const [loginUser, setLoginUser] = useState(false);
  const [bussiness, setBussiness] = useState(false);
  const [userName, setUserName] = useState();

  const login = async () => {
    const data = await authantication();
    if (data.message === 'OK') {
      setLoginUser(true);
      const user_info = await api_call(URL + '/users/user_info', 'GET');
      setUserName(user_info.name);
      if (user_info.bussiness === true) {
        setBussiness(true);
      }
    }
  }

  useEffect(() => {
    login();
  });

  return (
    <>
      <React.Fragment>
        <div className="App container mt-5">
          <Router >
            <NavBar userName={userName} />
            {/* <Test2 /> */}
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/about' element={<About />} />
              {/* protected tout for users */}
              <Route element={<Protected_rout_user loginUser={loginUser} />} >
                <Route path="/user_info" element={<User_info />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/favorite_cards" element={<Favorite_cards />} />
                {/* protected rout for bussiness */}
                <Route element={<Protected_rout_business bussiness={bussiness} />} >
                  <Route path="/add_card" element={<Add_card />} />
                  <Route path="/edit_card" element={<Edit_card />} />
                </Route>
              </Route>
            </Routes>
          </Router >
        </div >
      </React.Fragment >
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
