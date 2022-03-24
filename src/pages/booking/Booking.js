import React, { useEffect, useState } from "react";
import {Navigate, useNavigate, useSearchParams} from 'react-router-dom';
import { getTrains, bookTicket } from "../../apiCall";
import "./Booking.css";

export const Booking = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookings, setBookings] = useState({
    mobile: '',
    address: {
      add1: '',
      add2: '',
      add3: '',
      pinCode: '',
      state: '',
      city: '',
      postOffice: '' 
    },
    passengers: [{
      id: Date.now(),
      name: '',
      gender: '',
      age: '',
      preference: '',
    }]
  });

  useEffect(() => {
    trainsFn();
  }, [])

  const [trains, setTrains] = useState({});
  const trainId = searchParams.get('trainId');

  const trainsFn = () => {
    getTrains(`trainId=${trainId}`).then(res => {
      setTrains(res.data.trains)
    })
  }

  const handleClose = (id) => {
    const booking = bookings.passengers.filter(item => item.id !== id);
    setBookings({...bookings, passengers: booking})
  }

  const bookTrain = () => {
    bookTicket({
      trainId: trainId,
      passengers: bookings.passengers,
      classs: localStorage.getItem('class'),
      category: localStorage.getItem('category')
    }).then(res => {
      // window.location.replace('/');
    })
  }

  const handleAddPassengers = () => {
    const newBooks = {
      id: Date.now(),
      name: '',
      gender: '',
      age: '',
      preference: '',
    }
    setBookings({...bookings, passengers: [...bookings.passengers, newBooks]});
  }

  const handleInputChange = (e, id, type) => {
    const passengers = bookings.passengers.map(item => {
      if (item.id === id) {
        item[type] = e.target.value;
      }
      return item;
    })
    setBookings({...bookings, passengers: passengers});
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <span className={tab === 1 ? "tab-number" : ""}>1</span>
            <div>Passenger Details</div>
          </div>
          <div className="col-4">
            <span className={tab === 2 ? "tab-number" : ""}>2</span>
            <div>Review Journey</div>
          </div>
          <div className="col-4">
            <span className={tab === 3 ? "tab-number" : ""}>3</span>
            <div>Payment</div>
          </div>
        </div>
      </div>
      {tab === 1 ? (
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div class="card">
                <div class="card-header">
                  <div className="row">
                    <div className="col">
                      <h4>{trains.name} ({trains.no})</h4>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                </div>
                <div class="card-body">
                  <div className="row" style={{ paddingBottom: "10px" }}>
                    <div className="col-4">
                      <b>{trains.startTime}</b> | {localStorage.getItem('fromName').toLocaleUpperCase()} | {new Date(trains.date).toDateString()}
                    </div>
                    <div className="col-4">{}</div>
                    <div className="col-4">
                      <b>{trains.endTime}</b> | {localStorage.getItem('toName').toLocaleUpperCase()} | {new Date(trains.date).toDateString()}
                    </div>
                  </div>
                  <div className="row" style={{ paddingBottom: "10px" }}>
                    <div className="col-4"></div>
                    <div className="col-4">
                      <b>{localStorage.getItem('category')}</b>
                    </div>
                    <div className="col-4"></div>
                  </div>
                  <div
                    className="row"
                    style={{ padding: "10px", border: "1px solid #1457A7" }}
                  >
                    <h3>Passenger Details</h3>
                    {bookings.passengers.map(item =>
                    <div className="row">
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Passenger Name"
                            value={item.name}
                            onChange={(e) => handleInputChange(e, item.id, 'name')}
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div class="mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Age"
                            value={item.age}
                            onChange={(e) => handleInputChange(e, item.id, 'age')}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => handleInputChange(e, item.id, 'gender')}
                        >
                          <option selected={item.gender === ''}>Gender</option>
                          <option selected={item.gender === 'male'} value="male">Male</option>
                          <option selected={item.gender === 'female'} value="female">Female</option>
                          <option selected={item.gender === 'transGender'} value="transGender">Trans Gender</option>
                        </select>
                      </div>

                      <div className="col-3">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => handleInputChange(e, item.id, 'preference')}
                        >
                          <option selected={item.preference === ''}>No Preference</option>
                          <option selected={item.preference === 'lower'} value="lower">Lower</option>
                          <option selected={item.preference === 'middle'} value="middle">Middle</option>
                          <option selected={item.preference === 'upper'} value="upper">Upper</option>
                          <option selected={item.preference === 'sideLower'} value="sideLower">Side Lower</option>
                          <option selected={item.preference === 'sideUpper'} value="sideUpper">Side Upper</option>
                        </select>
                      </div>
                      {bookings.passengers.length > 1 ? <div className="col-1" style={{cursor: 'pointer'}} onClick={() => handleClose(item.id)}>X</div> : null}
                    </div>)}
                    <div className="col" style={{ color: "#1457A7", cursor: 'pointer' }} onClick={handleAddPassengers}>
                      + Add Passenger
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ padding: "10px", border: "1px solid #1457A7" }}
                  >
                    <h4>Contact Details</h4>
                    <h6>
                      (Ticket details will be sent to email- sa******@gmail.com
                      and registered mobile number 80******04)
                    </h6>
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
                            placeholder="Passenger mobile number *"
                            value={bookings.mobile}
                            onChange={(e) => setBookings({...bookings, mobile: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="row"
                    style={{ padding: "10px", border: "1px solid #1457A7" }}
                  >
                    <h4>Your Destination Address</h4>
                    <div className="row">
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Correspondence 1 *"
                            value={bookings.address.add1}
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.add1 = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            value={bookings.address.add2}
                            placeholder="Correspondence 2 (Optional)"
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.add2 = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            value={bookings.address.add3}
                            placeholder="Correspondence 3 (Optional)"
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.add3 = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            value={bookings.address.pinCode}
                            placeholder="PIN"
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.pinCode = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="State *"
                            value={bookings.address.state}
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.state = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="City *"
                            value={bookings.address.city}
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.city = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div class="mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Post Office"
                            value={bookings.address.postOffice}
                            onChange={(e) => {
                              let newAddress = {...bookings.address};
                              newAddress.postOffice = e.target.value;
                              setBookings({...bookings, address: newAddress})}
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ padding: "10px" }}>
                    <div className="col-2">
                      <button style={{ padding: "5px 20px" }} onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <div className="col-2">
                      <button className="book-now-btn" onClick={() => setTab(2)}>Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div class="card">
                <div class="card-header">
                  <div className="row">
                    <div className="col">
                      <h4>Fare Summary</h4>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                </div>
                <div class="card-body">
                  <div className="row" style={{ paddingBottom: "10px" }}>
                    <div className="col-6">
                      <b>Ticket Fare</b>
                    </div>
                    <div className="col-4">
                      <b>₹ {localStorage.getItem('price') * bookings.passengers.length}</b>
                    </div>
                    <div
                      className="row"
                      style={{
                        backgroundColor: "#213D77",
                        color: "#ffffff",
                        padding: "10px",
                        marginLeft: "0px",
                      }}
                    >
                      <div className="col-6">
                        <b>Total Fare</b>
                      </div>
                      <div className="col-4">
                        <b>₹ {localStorage.getItem('price') * bookings.passengers.length}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : tab === 2 ? (
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div class="card">
                <div class="card-header">
                  <div className="row">
                    <div className="col">
                      <h4>{trains.name.toLocaleUpperCase()} ({trains.no})</h4>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                </div>
                <div class="card-body">
                  <div className="row" style={{ paddingBottom: "10px" }}>
                    <div className="col-4">
                      <b>{trains.startTime}</b> | {localStorage.getItem('fromName')} | {new Date(trains.date).toDateString()}
                    </div>
                    <div className="col-4">11:40</div>
                    <div className="col-4">
                      <b>{trains.endTime}</b> | {localStorage.getItem('toName')} | {new Date(trains.date).toDateString()}
                    </div>
                  </div>
                  <div className="row" style={{ paddingBottom: "10px" }}>
                    <div className="col-4"></div>
                    <div className="col-4">
                      <b>{localStorage.getItem('class')} | {localStorage.getItem('category')}</b>
                    </div>
                    <div className="col-4"></div>
                  </div>
                  <div style={{ padding: "10px" }}>
                    {bookings.passengers.length} Adult | {localStorage.getItem('class')} | {localStorage.getItem('category')} | Boarding at {localStorage.getItem('fromName')} |
                    Boarding Date: {new Date(trains.date).toDateString()} {trains.startTime}
                  </div>
                  <div className="row" style={{ padding: "10px" }}>
                    <h3>Passenger Details</h3>
                    {bookings.passengers.map((item, index) =>
                    <div className="row">
                      <div className="col-4">
                        <h6>{index + 1} {item.name}</h6>
                      </div>
                      <div className="col">
                        {item.gender} | India | {item.preference}
                      </div>
                    </div>)}
                  </div>
                  <div className="row" style={{ padding: "10px" }}>
                    <h6>
                      (Ticket details will be sent to email- sa******@gmail.com
                      and registered mobile number 80******04)
                    </h6>
                  </div>

                  <div className="row" style={{ padding: "10px" }}>
                    <div className="col-2">
                      <button style={{ padding: "5px 20px" }} onClick={() => setTab(1)}>Back</button>
                    </div>
                    <div className="col-2">
                      <button className="book-now-btn" onClick={() => setTab(3)} >Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div class="card">
                <div class="card-header">
                  <div className="row">
                    <div className="col">
                      <h4>Fare Summary</h4>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                </div>
                <div class="card-body">
                  <div className="row" style={{ paddingBottom: "10px" }}>
                    <div className="col-6">
                      <b>Ticket Fare</b>
                    </div>
                    <div className="col-4">
                      <b>₹ {localStorage.getItem('price') * bookings.passengers.length}</b>
                    </div>
                    <div
                      className="row"
                      style={{
                        backgroundColor: "#213D77",
                        color: "#ffffff",
                        padding: "10px",
                        marginLeft: "0px",
                      }}
                    >
                      <div className="col-6">
                        <b>Total Fare</b>
                      </div>
                      <div className="col-4">
                        <b>₹ {localStorage.getItem('price') * bookings.passengers.length}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : tab === 3 ? (<>
        <div className="container payment" style={{ padding: "10px" }}>
          <h3>Payment Methods</h3>
          <div className="row">
            <div
              className="col-4"
              style={{ backgroundColor: "#FAFAFA", padding: "10px" }}
            >
              <div className="row">
                <div className="col-1">
                  <img
                    src="https://www.irctc.co.in/nget/assets/images/Irctc%20Wallet.PNG"
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col">
                  IRCTC iPay (Credit Card/Debit Card/UPI)
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <img
                    src="https://www.irctc.co.in/nget/assets/images/multiplepaymenticon.png"
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col">Multiple Payment Service</div>
              </div>
              <div className="row">
                <div className="col-1">
                  <img
                    src="https://www.irctc.co.in/nget/assets/images/Netbankingicon.png"
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col">Netbanking</div>
              </div>
              <div className="row">
                <div className="col-1">
                  <img
                    src="https://www.irctc.co.in/nget/assets/images/creditcardicon.png"
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                <div className="col">
                  Payment Gateway / Credit Card / Debit Card
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="row" style={{ padding: "10px" }}>
            <div className="col-4"></div>
        <div className="col-2">
          <button style={{ padding: "5px 20px" }} onClick={() => setTab(2)}>Back</button>
        </div>
        <div className="col-2">
          <button className="book-now-btn" onClick={bookTrain}>Pay and Book</button>
        </div>
      </div></>
      ) : null}
    </>
  );
};
