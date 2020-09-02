// getting our node modules
// getting our express backend framework
const express = require('express');

// mongoose is our ORM to interact with our database
const mongoose = require('mongoose');

//body parser will allow us to take requests and take data from the body of the request

// const bodyParser = require('body-parser'); - not needed in new version of express
const path = require('path'); // core node js module so dont need to npm install

const config = require('config');
const app = express(); // initialise express

// BodyParser Middleware
app.use(express.json());

// we need a mongodb URI
// To connect through MongoDB Atlas:
// -Build new Cluster,
// -Select AWS, Google or Azure provider and select "Free tier available" for region,
// -Be sure that Cluster Tier is M0(Sanbox) (as it is for free),
// -Change Cluster Name if you want,
// -Create Cluster,
// -Select "Collections" and Add my own data to create database,
// - Press "Connect" and select how you want to connect (I selected middle version "Connect Your Application",
// - Copy Connection String only and paste it in MongoURI in keys.js,

// DB Config
// now we can get config values via ..
const db = config.get('mongoURI');

// connect to mongo db
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}) // this is promise based so can use then, catch statements
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err));

// use Routes
app.use('/api/items', require('./routes/api/items')); // anything that goes to ... / api/items, will be referred to items variable
app.use('/api/users', require('./routes/api/users')); 

// create a postbuild script that once we push to heroku, will automatically make a build there instead of us having to do it and pushing to heroku.
// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));
    // any request that's not /api/items will load up this html file
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html')); // basically directing it to the index.html file.
    });
// current directory -> client -> build -> index.html

}

// now to run our server...
const port = process.env.PORT || 5000 //if we deploy to heroku, use process.env.PORT 

app.listen(port, () => console.log(`Server started on port ${port}`));

// now we want to get requests from our frontend to fetch items from the database, post items to the database, and delete items in the database
