const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const db = process.env.MONGODB_URI
// console.log(process.env.NODE_ENV)
const db = keys.state === 'production' ? process.env.MONGODB_URI : keys.mongoDB.dbURI;



mongoose.connect(db, { useNewUrlParser: true }, () => {

    console.log("connected to mongodb");
});

const app = express();

app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(express.static("uploads"));
app.use(bodyParser.json());





//routes  http://localhost:3000/users
app.use('/users', require('./routes/users'));


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//start the server
const port = process.env.PORT || 5000;

app.listen(port);
console.log(`Server listening at port ${port}`);