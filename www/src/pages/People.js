import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Item from "../components/Item";

const API_BASE_URL = "http://localhost:8080/";
const API_PEOPLE_URL = `${API_BASE_URL}people/`;

const People = () => {
    const [data, setData] = useState({});
    let {id} = useParams();

    console.log(`${API_PEOPLE_URL}${id}`)

    useEffect(() => {
        getPersonByID();
    }, []);

    const getPersonByID = async () => {
        try {
        const res = await axios.get(`${API_PEOPLE_URL}${id}`);
        setData(res.data);
        console.log(res.data)
        } catch (err) {
        console.error(err);
        }
    };
    
    return (
        <div>
            {data && 
                <Item data={data} type={'people'} />
            }
        </div>
      );
};

export default People;