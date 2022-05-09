const express = require("express");
const app = express();
const axios = require("axios").default;
const User = require("./../schema/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Create new user
app.post('/register', async (req, res) => {
    // Add new user to database
    User.findOne({username: req.body.username}, async (err,doc) => {
        if(err) throw err;
        if(doc) res.send("User already exists!");
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            const token = jwt.sign({username: user.username}, process.env.JWT_SECRET);
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.send(err);
                } else {
                    res.send({ success: true, token: "Bearer " + token });
                }
            });
        }
    })    
});

// Login user
app.post('/login', async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log(user)
        if (err) throw err;
        if (!user) res.status(401).send("Some of the input values are wrong");
        else {
            req.logIn(user, { session: false }, (err) => {
                if (err) throw err;
                const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);

                return res.json({ token: "Bearer " + token });
            });
        }
    })(req, res, next);
});

// Get all films
app.get('/films', passport.authenticate("jwt", { session: false }), async (req,res) => {
    try {
        const response = await axios.get('https://swapi.dev/api/films/');
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get film by ID 
app.get('/films/:id', passport.authenticate("jwt", { session: false }), async (req,res) => {
    try {
        const response = await axios.get(`${'https://swapi.dev/api/films/'+req.params.id}`);
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get people
app.get('/people', passport.authenticate('jwt', { session: false }), async (req,res) => {
    try {
        const response = await axios.get('https://swapi.dev/api/people/');
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get people by ID 
app.get('/people/:id', passport.authenticate('jwt', { session: false }), async (req,res) => {
    try {
        const response = await axios.get(`${'https://swapi.dev/api/people/'+req.params.id}`);
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get planets
app.get('/planets', passport.authenticate('jwt', { session: false }), async (req,res) => {
    try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

// Get planet by ID 
app.get('/planets/:id', passport.authenticate('jwt', { session: false }), async (req,res) => {
    try {
        const response = await axios.get(`${'https://swapi.dev/api/planets/'+req.params.id}`);
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
    }
});

module.exports = app;