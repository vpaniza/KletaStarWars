const express = require("express");
const app = express();
const axios = require("axios").default;

// Get all films
app.get('/films', async (req,res) => {
    console.log("getting films...")
    try {
        const response = await axios.get('https://swapi.dev/api/films/');
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get film by ID 
app.get('/films/:id', async (req,res) => {
    console.log("getting film...")
    try {
        const response = await axios.get(`${'https://swapi.dev/api/films/'+req.params.id}`);
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get people
app.get('/people', async (req,res) => {
    console.log("getting people...")
    try {
        const response = await axios.get('https://swapi.dev/api/people/');
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get people by ID 
app.get('/people/:id', async (req,res) => {
    console.log("getting person...")
    try {
        const response = await axios.get(`${'https://swapi.dev/api/people/'+req.params.id}`);
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get planets
app.get('/planets', async (req,res) => {
    console.log("getting planets...")
    try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get planet by ID 
app.get('/planets/:id', async (req,res) => {
    console.log("getting planet...")
    try {
        const response = await axios.get(`${'https://swapi.dev/api/planets/'+req.params.id}`);
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

module.exports = app;