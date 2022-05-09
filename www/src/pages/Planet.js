import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Item from "../components/Item";
import Spinner from "../components/Spinner";
import Unauthorized from "../components/Unauthorized";

const API_BASE_URL = "http://localhost:8080/";
const API_PLANETS_URL = `${API_BASE_URL}planets/`;

const Film = () => {
  const [data, setData] = useState({});
  const [userContext, setUserContext] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  let {id} = useParams();

  useEffect(() => {
	getPlanetByID();
  }, []);

  const getPlanetByID = async () => {
	try {
	  const res = await axios.get(`${API_PLANETS_URL}${id}`, { 
		'headers': 
			{ 'Authorization': userContext.token} 
		});
	  setData(res.data);
	  setIsLoading(false);
	} catch (err) {
	  console.error(err);
	}
  };

  return (
	<>
		{Object.keys(userContext).length > 0 ? (
			data && !isLoading ?
				<Item data={data} type={'planet'} />
				:
				<Spinner />
			)
			:
			<Unauthorized />
		}
	</>
  );
};

export default Film;