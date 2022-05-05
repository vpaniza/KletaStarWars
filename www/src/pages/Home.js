import React, { useState, useEffect } from "react";
import axios from "axios";
import Section from "../components/Section";

const API_BASE_URL = 'http://localhost:8080/';
const API_FILMS_URL = `${API_BASE_URL}films`;
const API_PEOPLE_URL = `${API_BASE_URL}people`;
const API_PLANETS_URL = `${API_BASE_URL}planets`;

const Home = () => {
    const [filmsData, setFilmsData] = useState([]);
    const [peopleData, setPeopleData] = useState([]);
    const [planetsData, setPlanetsData] = useState([]);

    useEffect(() => {
        getFilmsData();
        getPeopleData();
        getPlanetsData();
    }, []);
    
    const getFilmsData = async () => {
        try {
            const resp = await axios.get(API_FILMS_URL);
            setFilmsData(resp.data.results);
        } catch (err) {
            console.error(err);
        }
    };
    
    const getPeopleData = async () => {
        try {
            const resp = await axios.get(API_PEOPLE_URL);
            setPeopleData(resp.data.results);
        } catch (err) {
            console.error(err);
        }
    };
    
    const getPlanetsData = async () => {
        try {
            const resp = await axios.get(API_PLANETS_URL);
            setPlanetsData(resp.data.results);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {filmsData.length > 0 &&
                <Section items={filmsData} type={'film'} />
            }
            {peopleData.length > 0 &&
                <Section items={peopleData} type={'people'} />
            }
            {planetsData.length > 0 &&
                <Section items={planetsData} type={'planet'} />
            }
        </>
    )
};

export default Home;