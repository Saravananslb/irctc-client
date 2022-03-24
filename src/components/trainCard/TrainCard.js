import React from "react";
import "./TrainCard.css";

export const TrainCard = ({ train }) => {
  return (
    <>
      <div class="card">
        <div class="card-header">
          <div className="row">
            <div className="col">
              <h4>
                {train.name.toUpperCase()} ({train.no})
              </h4>
            </div>
            <div className="col">
              <span>Runs On:</span>
              {train.runs.map((item) =>
                item.status ? (
                  <span>
                    <b>{item.date} </b>
                  </span>
                ) : (
                  <span>{item.date} </span>
                )
              )}
            </div>
            <div className="col">Train Schedule</div>
          </div>
        </div>
        <div class="card-body">
          <div className="row" style={{ paddingBottom: "10px" }}>
            <div className="col-4">
              <b>{train.startTime}</b> |{" "}
              {localStorage.getItem("fromName").toLocaleUpperCase()}
            </div>
            <div className="col-4">
              {/* {localStorage.getItem('endTime')} */}
            </div>
            <div className="col-4">
              <b>{train["endTime"]}</b> |{" "}
              {localStorage.getItem("toName").toLocaleUpperCase()} |{" "}
              {new Date(train.date).toDateString()}
            </div>
          </div>
          {/* <div className="row train-class">
            {train.seats.map(item =>
            <div className="col">
              <h6>{item.class}</h6>
              <div>Refresh</div>
            </div>
            )}
          </div> */}
          
          {train.seats.map((item) => (
            <>
          <div className="row ticket-class-1">
              <div className="col-2 selected-class">{item.class}</div>
          </div>
          <div className="row ticket-class-2">
            <div className="col-2 train-tickets">
              <b>{new Date(train.date).toDateString()}</b>
              
                <div className="available">{item.seat}</div>
            </div>
          </div>
          <div className="row" style={{ padding: "10px" }}>
            <div className="col-2">
              <button
                className="book-now-btn"
                onClick={() =>
                  {
                    localStorage.setItem('price', item.price);
                    localStorage.setItem('class', item.class);
                    window.location.replace(`/booking?trainId=${train._id}`)}
                  } >
                Book Now
              </button>
            </div>
          </div>
          </>))}
        </div>
      </div>
    </>
  );
};
