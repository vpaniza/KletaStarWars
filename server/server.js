const path = require("path");
const cors = require("cors");
const favicon = require('express-favicon');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();

mongoose.connect(
  `${"mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PWD+"@"+process.env.MONGO_DB+"?retryWrites=true&w=majority"}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose connected");
  }
);

app.use(favicon(__dirname + '../client/build/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://kleta-star-wars.herokuapp.com", "https://kleta-star-wars.herokuapp.com", "http://localhost:5000", "https://swapi.dev/api", "https://localhost:5000"],
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
require("./passportConfig")(passport);
require("./jwtConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

require("./routes")(app);

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", function (req, res) {
  console.log(res.headersSent); 
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));