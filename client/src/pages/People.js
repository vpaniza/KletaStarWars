import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Item from "../components/Item";
import Spinner from "../components/Spinner";
import Unauthorized from "../components/Unauthorized";

//const API_BASE_URL = 'http://localhost:5000/';
const API_BASE_URL = '/';
const API_PEOPLE_URL = `${API_BASE_URL}people/`;

const People = () => {
    const [data, setData] = useState({});
    const [userContext, setUserContext] = useContext(UserContext);
    const [homeworld, setHomeworld] = useState();
    const [starships, setStarships] = useState();
    const [starshipsLoaded, setStarshipsLoaded] = useState(false);
    const [homeworldLoaded, setHomeworldLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let {id} = useParams();

    useEffect(() => {
        getPersonByID();
    }, []);
    
    useEffect(() => {
        if(starshipsLoaded && homeworldLoaded) setIsLoading(false);
    }, [starshipsLoaded, homeworldLoaded]);
    
    useEffect(() => {
        if(Object.keys(data).length > 0){
            if(data.starships){
                getStarships(data.starships);
            }
            if(data.homeworld){
                getHomeworld(data.homeworld);
            }
        }
    }, [data]);

    const getHomeworld = async (hw) => {
        try{
            const res = await axios.get(hw);
            setHomeworld(res.data.name);
            setHomeworldLoaded(true);
        } catch(err){
            console.error(err);
        }
    };

    const getStarships = async (ss) => {
        try{
            if(typeof ss === "object"){
                const starshipsArr = data.starships.map(async (ss,idx) => {
                    const starship = await axios.get(ss);
                    return starship.data.name;
                });
                Promise.all(starshipsArr).then(res => {
                    setStarships(res);
                    setStarshipsLoaded(true);
                });
            }else if(typeof ss === "string"){
                const starship = await axios.get(ss);
                setStarships(starship.data.name);
                setStarshipsLoaded(true);
            }
        } catch(err){
            console.error(err);
        }
    }

    const getPersonByID = async () => {
        try {
            const res = await axios.get(`${API_PEOPLE_URL}${id}`, { 
                'headers': 
                    { 'Authorization': userContext.token} 
                });
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <>
            {Object.keys(userContext).length > 0 ? (
                data && !isLoading ?
                    <Item data={data} type={'people'} starships={starships} homeworld={homeworld}/>
                    :
                    <Spinner />
                )
                :
                <Unauthorized />
            }
        </>
      );
};

export default People;