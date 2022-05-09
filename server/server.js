const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5000;

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

app.use(bodyParser.json())

app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "https://star-wars-kleta.herokuapp.com" : "http://localhost:3000",
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
require("./passportConfig")(passport);
require("./jwtConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.resolve(__dirname, "../www/build")));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "www", "build", "index.html"));
});
app.get("/", (req, res) => {
  res.send({ status: "success" })
});

//////////////////////  ROUTES IMPORT  ///////////////////////

const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));