import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Item from "../components/Item";

const API_BASE_URL = "http://localhost:8080/";
const API_FILMS_URL = `${API_BASE_URL}films/`;

const Film = ({ match }) => {
  const [data, setData] = useState({});
  let {id} = useParams();


  useEffect(() => {
	getFilmByID();
  }, []);

  const getFilmByID = async () => {
	try {
	  const res = await axios.get(`${API_FILMS_URL}${id}`);
	  setData(res.data);
	} catch (err) {
	  console.error(err);
	}
  };

  return (
	<div>
		{/* <div className="item-wrapper" key={data.episode_id}>
			<div className="image">
				<img className="prod-image" src={} alt="" />
			</div>
			<div className="content">
				<h1 className="title">{data.title}</h1>
				<h2 className="subtitle">Director: {data.director}</h2>
				<h2 className="subtitle">Producer: {data.producer}</h2>
				<p className="description">{data.opening_crawl}</p>
			</div>
		</div> */}
		{data && 
			<Item data={data} type={'film'} />
		}
	</div>
  );
};

export default Film;
