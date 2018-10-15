//require express package
const express = require('express');

//require body-parse package 
const bodyParser = require('body-parser');

//require request package 
const request = require('request');

//create instance invoking express 
const app = express()

//variable to hold openweather api key
const apiKey = '5325c0d3e4b843d4ed1abad264b87777';

//allows access all of the static files within the ‘public’ folder.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// set up template engine
app.set('view engine', 'ejs')

//set get route to create server
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

//set post route to send request
app.post('/', function (req, res) {
  //declare block variable for city and url for openweather api
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
 
  // make the api call
  //pass in a url 
  //request returns a callback function with three arguments: err, response, and body.
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      //convert JSON text into JavaScript object
      let weather = JSON.parse(body)
      //checking if weather is undefined
      //(ex. if user enters a string that isn't a city)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

//specify app to listen on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
