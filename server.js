const express = require("express");
const logger = require("morgan");
const bodyParser = require('body-parser')


const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json()) 



app.use(logger('dev'));

const defaultRoutes = require('./routes/defaultRoutes');


app.use("/api", defaultRoutes);
// app.use("/images", express.static(__dirname + '/uploads'));




app.listen(port, () => console.log(`Serve running on: ${port}`))