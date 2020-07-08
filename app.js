//include express middleware to access node-functionality
const express = require('express');
//include morgan middleware to access testing functionality
const morgan = require('morgan');
//include CORS middleware for cross-domain security
const cors = require('cors');
//create the app object starting from express middleware
const app = express();

//add the cors and the morgan to the existing object
app.use(cors());
app.use(morgan('common'));
//using data from app-data file
const apps = require('./app-data');

//add the get api point to the app object
//example of sort API call:http://localhost:8000/apps?sort=Rating 
//example of sort and genre API call:http://localhost:8000/apps?sort=App&genre=Arcade

app.get('/apps', (req, res) => {
  //read extra parametres from API call
  const { sort, genre } = req.query;
  //if sort parameter exists...
  if (sort) {
    //...'rating' and 'app' are not part of the sort parameter...
    if (!['Rating', 'App'].includes(sort)) {
      //...return an error
      return res
        //response with status 400
        .status(400)
        //and send this message below
        .send('Sort must be one of ratings or app');
    }
  }
  
// filter the results based on the genre 
  let results = genre ? apps.filter(app =>
      app
        .Genres
        .includes(genre)): apps;

//if sort is set up ...
  if (sort) {
    //...order the results based ob the sorting parameter
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }


//return results ro json
  res
    .json(results);
})


module.exports = app;