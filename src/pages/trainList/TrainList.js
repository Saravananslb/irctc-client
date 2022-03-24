import React from "react";
import './TrainList.css';
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TrainCard } from "../../components/trainCard/TrainCard";
import { getLocations, getTrains } from "../../apiCall";

export const TrainList = () => {
  const [trainSearch, setTrainSearch] = React.useState({
    from: '',
    to: '',
    doj: '',
    category: 'GENERAL'
  });

  const [from, setFrom] = React.useState([]);
  const [to, setTo] = React.useState([]);
  const [trains, setTrains] = React.useState([]);

  const handleLocationChange = (e, type) => {
    getLocations(e.target.value).then(res => {
      if (res.data.status) {
        if (type === 'FROM'){
          setFrom(res.data.locations);
        }
        else if (type === 'TO'){
          setTo(res.data.locations);
        }
      }
    })
  }

  const handleLocationSelect = (item, type) => {
    if (type === 'FROM') {
      localStorage.setItem('from', item._id);
      localStorage.setItem('fromName', item.name);
      setFrom([]);
      setTrainSearch({...trainSearch, from: item.name});
      console.log(item)
    }
    else if (type === 'TO') {
      localStorage.setItem('to', item._id);
      localStorage.setItem('toName', item.name);
      setTo([]);
      setTrainSearch({...trainSearch, to: item.name});
    }
  }

  React.useEffect(() => {
    setTrainSearch({
      from: localStorage.getItem('fromName'),
      to: localStorage.getItem('toName'),
      doj: localStorage.getItem('doj'),
      category: localStorage.getItem('category')
    })
    trainsFn();
  }, []);

  const trainsFn = () => {
    getTrains(`fromLocation=${localStorage.getItem('from')}&toLocation=${localStorage.getItem('to')}`).then(res => {
      setTrains(res.data.trains)
    })
  }

  return (
    <>
      <div
        class="container"
        style={{ backgroundColor: "#213d77", padding: "10px" }}
      >
        <div className="row" style={{ padding: "10px", color: "#ffffff" }}>
          <div className="col-2">
            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              value={trainSearch.from}
              onChange={(newValue) => handleLocationChange(newValue, 'FROM')}
              style={{ width: "100%", backgroundColor: "#ffffff" }}
            />
            {from.map(item =>
              <li class="list-group-item" style={{padding: '10px', cursor: 'pointer'}} onClick={() => handleLocationSelect(item, 'FROM')}>
                <div>{item.name.toUpperCase()}</div>
              </li>
            )}
          </div>
          <div className="col-2">
            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              value={trainSearch.to}
              onChange={(newValue) => handleLocationChange(newValue, 'TO')}
              style={{ width: "100%", backgroundColor: "#ffffff" }}
            />
            {to.map(item =>
              <li class="list-group-item" style={{padding: '10px', cursor: 'pointer'}} onClick={() => handleLocationSelect(item, 'TO')}>
                <div>{item.name.toUpperCase()}</div>
              </li>
            )}
          </div>
          <div className="col-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="MM/DD/YYYY"
                value={trainSearch.doj}
                minDate={new Date()}
                onChange={(newValue) => {
                  setTrainSearch({...trainSearch, doj: newValue});
                  localStorage.setItem('doj', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    style={{ backgroundColor: "#ffffff" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="col-2">
            <FormControl style={{ width: "95%", backgroundColor: "#ffffff" }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  value={trainSearch.category}
                label="GENERAL"
                onChange={(e) => {
                  setTrainSearch({...trainSearch, category: e.target.value });
                  localStorage.setItem('category', e.target.value)
                }}
              >
                <MenuItem value={"GENERAL"}>GENERAL</MenuItem>
                <MenuItem value={"LADIES"}>LADIES</MenuItem>
                <MenuItem value={"LOWER BERTH/SR.CITIZEN"}>LOWER BERTH/SR.CITIZEN</MenuItem>
                <MenuItem value={"DIVYAANG"}>DIVYAANG</MenuItem>
                <MenuItem value={"TATKAL"}>TATKAL</MenuItem>
                <MenuItem value={"PREMIUM TATKAL"}>PREMIUM TATKAL</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          <div className="col-2">
            <button className="train_Search">Modify Search</button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-3">
            <div className="row">
              <div className="col">Refine Results</div>
              <div className="col">Reset Filters</div>
            </div>
            <hr />
            <div className="row">
              <div className="col">JOURNEY CLASS</div>
              <div className="col">Select All</div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    AC First Class
                  </label>
                </div>
              </div>
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    AC 2 Tier (2A)
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Second Sitting (2S)
                  </label>
                </div>
              </div>
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    AC 3 Tier (3A)
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Sleeper (SL)
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
            <hr />
            <div className="row">
              <div className="col">TRAIN TYPE</div>
              <div className="col">Select All</div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    OTHER
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    SPECIAL
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>

          <div class="col-9">
            <div className="row">
              <div>
                {trains.length} Results for {trainSearch.from.toLocaleUpperCase()} | {trainSearch.to.toLocaleUpperCase()} | {trainSearch.doj.split('2022')[0]} For
                Quota | {trainSearch.category}
              </div>
            </div>
            <div className="row" style={{padding: '10px'}}>
                <div className=" col-5">
                    <button className="sort-btn">Sort By | Duration</button>
                    <button className="sort-available-btn">Show Available Trains</button>
                </div>
                <div className="col-3"></div>
                <div className=" col-4">
                    <button className="previous-btn">Previous Day</button>
                    <button className="next-btn">Next Day</button>
                </div>
            </div>
            {trains.map(item => <TrainCard train={item}/>)}
            
          </div>
        </div>
      </div>
    </>
  );
};
