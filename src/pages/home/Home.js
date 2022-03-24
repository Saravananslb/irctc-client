import React from "react";
import { SearchTrain } from "../../components/searchTrain/SearchTrain";
import './Home.css';

export const Home = () => {
    return (
        <>
        <div className="home-background">
            <img src="https://www.irctc.co.in/nget/home_page_banner1.b233d37e7fc8266ecd46.jpg" width={1500} alt="" />
        </div>
        <div className="search-train">
            <SearchTrain/>
        </div>
        </>
    )
}