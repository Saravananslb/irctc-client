import React from "react";
import { Context } from "../../Context";
import { SIGNIN } from "../../actions/ActionType";
import { useNavigate } from 'react-router-dom';
import "./Header.css";

export const Header = () => {

  const { state, dispatch } = React.useContext(Context);
  // const navigate = useNavigate();

  const handleLoginEnable = () => {
    dispatch({
      type: SIGNIN,
      payload: {
        signInEnabled: true
      }
    })
  }

  return (
    <>
      <div class="container" style={{padding: '10px'}}>
        <div class="row">
          <div class="col-2">
            <img
              src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png"
              alt=""
              height={100}
            />
          </div>
          <div class="col-8" style={{ padding: "10px" }}>
            <button className="login-btn" onClick={handleLoginEnable}>LOGIN</button>
            <button className="register-btn" onClick={() => window.location.replace('/profile/user-registration')}>REGISTER</button>
            <button className="register-btn" onClick={() => window.location.replace('/my-bookings')}>My Bookings</button>
            <button className="contact-us-btn">CONTACT US</button>
          </div>
          <div class="col-2">
            <img
              src="https://www.irctc.co.in/nget/assets/images/logo.png"
              alt=""
              height={100}
            />
          </div>
        </div>
      </div>
    </>
  );
};
