import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Item from "../components/Item";
import Spinner from "../components/Spinner";
import Unauthorized from "../components/Unauthorized";

//const API_BASE_URL = 'http://localhost:5000/';
const API_BASE_URL = 'https://kleta-star-wars.herokuapp.com/';
const API_FILMS_URL = `${API_BASE_URL}films/`;

const Film = () => {
  const [data, setData] = useState({});
  const [userContext, setUserContext] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  let {id} = useParams();

  useEffect(() => {
	getFilmByID();
  }, []);

  const getFilmByID = async () => {
	try {
	  const res = await axios.get(`${API_FILMS_URL}${id}`, { 
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
				<Item data={data} type={'film'} />
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
