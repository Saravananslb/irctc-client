import React from 'react';
import { Home } from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Reducer } from './reducer/Reducer';
import { Context } from './Context';
import { useState } from 'react';
import { useReducer } from 'react';
import { Login } from './components/login/Login';
import { TrainList } from './pages/trainList/TrainList';
import { cookie, validateUser } from './apiCall';
import { AUTHENTICATE } from './actions/ActionType';
import { useEffect } from 'react';
import { Header } from './components/header/Header';
import { SignUp } from './pages/signUp/SignUp';
import { Booking } from './pages/booking/Booking';
import { MyTransactions } from './pages/myTransactions/MyTransactions';

function App() {
  const [initialState, setInitialState] = useState({
    signInEnabled: false,
    searchEnabled: false,
    isAuthenticated: false
  });

  useEffect(() => {
    // validateAuth();
  }, [])

  const validateAuth = () => {
    validateUser().then(res => {
      if (res.data && res.data.status) {
        cookie.set('Authorization', res.data.authToken);
        dispatch({
          type: AUTHENTICATE,
          payload: {
            isAuthenticated: true
          }
        })
      }
      else {
        cookie.remove('Authorization');
      }
    })
  }

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={{state, dispatch}}>
    <div className='App'>
      <Login/>
      {/* <SideSearchBar /> */}
      <Header/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/booking/train-list' element={<TrainList />} ></Route>
        <Route path='/profile/user-registration' element={<SignUp />} ></Route>
        <Route path='/booking' element={<Booking />} ></Route>
        <Route path='/my-bookings' element={<MyTransactions />} ></Route>
        {/* <Route path='/restaurants/:restaurantId' element={<RestaurantMenu />} ></Route> */}
      </Routes>
    </BrowserRouter>
    </div>
    </Context.Provider>
  );
}

export default App;
