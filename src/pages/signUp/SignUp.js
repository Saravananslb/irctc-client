import React, { useState } from "react";
import "./SignUp.css";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {Context} from '../../Context';
import { SIGNIN } from "../../actions/ActionType";
import { useNavigate } from "react-router-dom";
import { signUpUser } from '../../apiCall';

export const SignUp = () => {
  const [tab, setTab] = React.useState(1);
  const [value, setValue] = React.useState(2);
  const {state, dispatch} = React.useContext(Context);
  const [user, setUser] = useState({
    userName: '',
    password: '',
    preferredLanguage: '',
    firstName: '',
    middleName: '',
    lastName: '',
    occupation: '',
    dob: '',
    maritalStatus: '',
    gender: '',
    email: '',
    nationality: '',
    address: {},

  })

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignin = () => {
    dispatch({
      type: SIGNIN,
      payload: {
        signInEnabled: true
      }
    })
  }

  const handleSignup = () => {
    signUpUser(user).then(res => {
      console.log(res.data)
    })
  }

  return (
    <div className="signup-main">
      <div class="container signup-container">
        <div className="row">
          <div className="col">
            <div class="row">
              <div class="col-4">
                <h4>Create Your account</h4>
              </div>
              <div class="col-4"></div>
              <div class="col-4 signin-btn" onClick={handleSignin}>SignIn</div>
            </div>
            <div class="row sigin-header">
              <div class={tab === 1 ? "col-2 selected-class" : "col-2 "} onClick={() => setTab(1)}>
                Basic Details
              </div>
              <div class={tab === 2 ? "col-2 selected-class" : "col-2 "} onClick={() => setTab(2)}>
                Personal Details
              </div>
              <div class={tab === 3 ? "col-2 selected-class" : "col-2 "} onClick={() => setTab(3)}>
                Address
              </div>
            </div>
            <hr />
            {tab === 1 ? (
              <>
                <div>
                  <h5>
                    GARBAGE/JUNK VALUES IN PROFILE MAY LEAD TO DEACTIVATION
                  </h5>
                </div>
                <div>
                  <h6>
                    Please use a valid E-Mail ID and mobile number in
                    registration.
                  </h6>
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="User Name"
                    required
                    value={user.userName}
                    onChange={(e) => setUser({ ...user, userName: e.target.value})}
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value})}
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value})}
                  />
                </div>
                <select class="form-select" aria-label="Default select example" onChange={(e) => setUser({ ...user, preferredLanguage: e.target.value})}>
                  <option selected={user.preferredLanguage === ''}>Preferred Language</option>
                  <option value="English" selected={user.preferredLanguage === 'English'}>English</option>
                  <option value="Hindi" selected={user.preferredLanguage === 'Hindi'} >हिंदी</option>
                </select>
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-3">
                    {" "}
                    <button style={{ padding: "5px 20px" }} onClick={() => navigate(-1)}>Cancel</button>
                  </div>
                  <div className="col-6"></div>
                  <div className="col-3">
                    <button className="signin-btn-continue" onClick={() => setTab(2)}>
                      Continue {"->"}
                    </button>
                  </div>
                </div>
              </>
            ) : tab === 2 ? (
              <>
                <div className="row">
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Middle Name [Optional]"
                        value={user.middleName}
                        onChange={(e) => setUser({ ...user, middleName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Last Name [Optional]"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <b>
                    Info!Please provide your exact name as per Aadhaar to avail
                    Aadhaar based benefits on IRCTC eTicketing website.
                  </b>
                </div>
                <div className="row">
                  <div className="col-6">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setUser({ ...user, occupation: e.target.value})}
                    >
                      <option selected={user.occupation === ''}>Select Occupation</option>
                      <option selected={user.occupation === 'GOVERNMENT'} value="GOVERNMENT">GOVERNMENT</option>
                      <option selected={user.occupation === 'PUBLIC'} value="PUBLIC">PUBLIC</option>
                      <option selected={user.occupation === 'PRIVATE'} value="PRIVATE">PRIVATE</option>
                      <option selected={user.occupation === 'PROFESSIONAL'} value="PROFESSIONAL">PROFESSIONAL</option>
                      <option selected={user.occupation === 'SELF EMPLOYED'} value="SELF EMPLOYED">SELF EMPLOYED</option>
                      <option selected={user.occupation === 'STUDENT'} value="STUDENT">STUDENT</option>
                      <option selected={user.occupation === 'OTHER'} value="OTHER">OTHER</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        label="MM/DD/YYYY"
                        value={user.dob}
                        minDate={new Date()}
                        onChange={(e) => setUser({ ...user, dob: e})}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value={user.maritalStatus === "married"}
                        onChange={(e) => setUser({ ...user, maritalStatus: "married"})}
                      />
                      <label class="form-check-label" for="inlineRadio1">
                        Married
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value={user.maritalStatus === "unMarried"}
                        onChange={(e) => setUser({ ...user, maritalStatus: "unMarried"})}
                      />
                      <label class="form-check-label" for="inlineRadio2">
                        Unmarried
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Nationality"
                        value={user.nationality}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-6">
                    <div className="row gender">
                      <div className="col" onClick={(e) => setUser({ ...user, gender: "male"})}>Male</div>
                      <div className="col" onClick={(e) => setUser({ ...user, gender: "female"})}>Female</div>
                      <div className="col" onClick={(e) => setUser({ ...user, gender: "transgender"})}>Transgender</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="code"
                            value={91}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-9">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Mobile"
                            value={user.mobile}
                            onChange={(e) => setUser({ ...user, mobile: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setUser({ ...user, nationality: e.target.value})}
                    >
                      <option selected={user.nationality === ''}>Select a Nationality</option>
                      <option selected={user.nationality === 'Indian'} value="Indian">Indian</option>
                      <option selected={user.nationality === 'NonIndian'} value="NonIndian">Non Indian</option>
                    </select>
                  </div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-3">
                    {" "}
                    <button style={{ padding: "5px 20px" }} onClick={() => setTab(1)}>Back</button>
                  </div>
                  <div className="col-6"></div>
                  <div className="col-3">
                    <button className="signin-btn-continue" onClick={() => setTab(3)}>
                      Continue {"->"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="First/Door/Block No."
                        value={user.address.doorNo ? user.address.doorNo : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, doorNo: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Street/Lane Name [Optional]"
                        value={user.address.street ? user.address.street : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, street: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Area/Locality (Optional)"
                        value={user.address.area ? user.address.area : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, area: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Pin Code"
                        value={user.address.pinCode ? user.address.pinCode : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address,pinCode: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="State"
                        value={user.address.state ? user.address.state : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, state: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="City"
                        value={user.address.city ? user.address.city : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, city: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Post Office"
                        value={user.address.postOffice ? user.address.postOffice : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, postOffice: e.target.value}})}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Phone"
                        value={user.address.phone ? user.address.phone : ''}
                        onChange={(e) => setUser({ ...user, address: {...user.address, phone: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      <b>Please inform me about IRCTC Co-branded credit card through Phone/Email/SMS (Optional)</b>
                    </label>
                  </div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                  <div className="col-3">
                    {" "}
                    <button style={{ padding: "5px 20px" }} onClick={() => setTab(2)}>Back</button>
                  </div>
                  <div className="col-6"></div>
                  <div className="col-3">
                    <button className="signin-btn-continue" onClick={handleSignup}>
                      REGISTER
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* <div className="col-4"></div> */}
        </div>
      </div>
    </div>
  );
};
