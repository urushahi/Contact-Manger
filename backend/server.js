const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, {
        wtimeoutMS: 2500,
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MONGODB database connection established successfully");
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRouter = require('./routes/user');
const contactRouter = require('./routes/contact');

app.use('/user', userRouter);
app.use('/contact', contactRouter);

app.use(express.static("./src/assets/images"))


// Set EJS as templating engine 
app.set("view engine", "ejs");



app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

