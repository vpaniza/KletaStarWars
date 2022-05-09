import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Section from "../components/Section";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";
import Unauthorized from "../components/Unauthorized";

//const API_BASE_URL = 'http://localhost:5000/';
//const API_BASE_URL = '/';
const API_BASE_URL = "https://kleta-star-wars.herokuapp.com/";
const API_FILMS_URL = `${API_BASE_URL}films`;
const API_PEOPLE_URL = `${API_BASE_URL}people`;
const API_PLANETS_URL = `${API_BASE_URL}planets`;

const Home = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [filmsData, setFilmsData] = useState([]);
    const [filmsLoaded, setFilmsLoaded] = useState(false);
    const [peopleData, setPeopleData] = useState([]);
    const [peopleLoaded, setPeopleLoaded] = useState(false);
    const [planetsData, setPlanetsData] = useState([]);
    const [planetsLoaded, setPlanetsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getFilmsData();
        getPeopleData();
        getPlanetsData();
    }, []);
    
    useEffect(() => {
        if(filmsLoaded && peopleLoaded && planetsLoaded) setIsLoading(false);
    }, [filmsLoaded, planetsLoaded, peopleLoaded]);
    
    const getFilmsData = async () => {
        try {
            const resp = await axios.get(API_FILMS_URL, { 
                'headers': 
                    { 'Authorization': userContext.token} 
                });
            setFilmsData(resp.data.results);
            setFilmsLoaded(true);
        } catch (err) {
            console.error(err);
        }
    };
    
    const getPeopleData = async () => {
        try {
            const resp = await axios.get(API_PEOPLE_URL, { 
                'headers': 
                    { 'Authorization': userContext.token} 
                });
            setPeopleData(resp.data.results);
            setPeopleLoaded(true);
        } catch (err) {
            console.error(err);
        }
    };
    
    const getPlanetsData = async () => {
        try {
            const resp = await axios.get(API_PLANETS_URL, { 
                'headers': 
                    { 'Authorization': userContext.token} 
                });
            setPlanetsData(resp.data.results);
            setPlanetsLoaded(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {Object.keys(userContext).length > 0 && userContext.token ? (!isLoading ?
                <div>
                    {filmsData.length > 0 &&
                        <Section items={filmsData} type={'film'} />
                    }
                    {peopleData.length > 0 &&
                        <Section items={peopleData} type={'people'} />
                    }
                    {planetsData.length > 0 &&
                        <Section items={planetsData} type={'planet'} />
                    }
                </div>
                :
                <Spinner></Spinner>
                ) 
                :
                <Unauthorized />
            }
        </>
    )
};

export default Home;