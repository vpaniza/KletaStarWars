const path = require('path');
const cors = require("cors");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.use(cors());

/* app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
}); */

app.get('/api', (req, res) => {
  res.json({ message: 'Server connected to react' });
});

//////////////////////  ROUTES IMPORT  ///////////////////////

const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));