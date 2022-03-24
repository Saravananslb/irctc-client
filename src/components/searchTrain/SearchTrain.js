import React, { useEffect, useState } from "react";
import "./SearchTrain.css";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getLocations } from "../../apiCall";

export const SearchTrain = () => {
  const [trainSearch, setTrainSearch] = React.useState({
    from: '',
    to: '',
    doj: '',
    category: 'GENERAL'
  });

  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

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

  return (
    <>
      <div class="container">
        <div className="row header-item">
          <div class="col-6">PNR STATUS</div>
          <div class="col-6">CHART/VACANCY</div>
        </div>
        <div
          className="row"
          style={{ backgroundColor: "#ffffff", padding: "10px" }}
        >
          <div class="col-4">
            <img
              src="https://www.irctc.co.in/nget/assets/images/logo_top_eng.jpg"
              width={180}
              height={120}
              alt=""
            />
          </div>
          <div class="col-8">
            <h1 style={{ color: "#213d77" }}>BOOK TICKET</h1>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "#ffffff" }}>
          <div className="col-7">
            <TextField
              id="outlined-basic"
              label="From"
              variant="outlined"
              style={{ width: "80%" }}
              value={trainSearch.from}
              onChange={(newValue) => handleLocationChange(newValue, 'FROM')}
            />
            {from.map(item =>
              <li class="list-group-item" style={{padding: '10px', cursor: 'pointer'}} onClick={() => handleLocationSelect(item, 'FROM')}>
                <div>{item.name.toUpperCase()}</div>
              </li>
            )}
          </div>
          <div className="col-5">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="MM/DD/YYYY"
                value={trainSearch.doj}
                minDate={new Date()}
                onChange={(newValue) => {
                  setTrainSearch({...trainSearch, doj: newValue});
                  localStorage.setItem('doj', newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div
          className="row"
          style={{ backgroundColor: "#ffffff", padding: "10px" }}
        >
          <div className="col-7">
            <TextField
              id="outlined-basic"
              label="To"
              variant="outlined"
              style={{ width: "80%" }}
              value={trainSearch.to}
              onChange={(newValue) => handleLocationChange(newValue, 'TO')}
            />
            {to.map(item =>
              <li class="list-group-item" style={{padding: '10px', cursor: 'pointer'}} onClick={() => handleLocationSelect(item, 'TO')}>
                <div>{item.name.toUpperCase()}</div>
              </li>
            )}
          </div>
          <div className="col-5">
            <FormControl style={{ width: "95%" }}>
              
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
        </div>
        <div className="row" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
            <div className="col-4">
                <button className="train_Search" onClick={() => window.location.replace('/booking/train-list')}>Search</button>
            </div>
            <div className="col-5"></div>
        </div>
      </div>
    </>
  );
};
