import React from "react";

export const Transactions = ({ train }) => {
  return (
    <>
      <div class="card">
        <div class="card-header">
          <div className="row">
            <div className="col-4">
              <h4>
                {train.trains.name.toUpperCase()} ({train.trains.no})
              </h4>
            </div>
            <div className="col-4"></div>
            <div className="col-4">PNR: {train._id}</div>
          </div>
        </div>
        <div class="card-body">
          <div className="row" style={{ paddingBottom: "10px" }}>
            <div className="col-4">
              <b>{train.startTime}</b> |{" "}
              {train.fromLocation.toLocaleUpperCase()}
            </div>
            <div className="col-4">
              {/* {localStorage.getItem('endTime')} */}
            </div>
            <div className="col-4">
              <b>{train.trains["endTime"]}</b> |{" "}
              {train.toLocation.toLocaleUpperCase()} |{" "}
              {new Date(train.trains.date).toDateString()}
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

          {/* {train.seats.map((item) => ( */}
            <>
              
              <div className="row" style={{ padding: "10px" }}>
                <div className="col-4">
                  STATUS: <span style={{color: 'green'}}>BOOKED</span>
                </div>
                <div className="col-4"></div>
                <div className="col-4">
                  Boarding Station: {train.toLocation.toLocaleUpperCase()}
                </div>
              </div>
              <div className="row" style={{ padding: "10px" }}>
                <h3>Passenger Details</h3>
                {train.passengers.map((item, index) => (
                  <>
                    <div className="row">
                      <div className="col-4">
                        <h6>
                          {index + 1} {item.name}
                        </h6>
                      </div>
                      <div className="col-2">
                        <h6> {item.age}</h6>
                      </div>
                      <div className="col">
                        {item.gender} | India | {item.preference}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">Ticket Status</div>
                      <div className="col-2">Coach</div>
                      <div className="col-2">Berth/WL No</div>
                      <div className="col-2">Berth Type</div>
                    </div>
                    <div className="row">
                      <div className="col-2">CNF</div>
                      <div className="col-2">{train.coach}</div>
                      <div className="col-2">{item.seatNo || ''}</div>
                      <div className="col-2">{item.berth || 'SIDE UPPER'}</div>
                    </div>
                  </>
                ))}
              </div>
            </>
          {/* ))} */}
        </div>
      </div>
    </>
  );
};
