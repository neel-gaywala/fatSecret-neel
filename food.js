const express = require("express");
const fs = require('fs');
const path = require('path');
const route = new express.Router();

var request = require("request");

route.get("/", async (request, response) => {

    response.sendFile( path.join( __dirname, '/home.html') );

});

//set your data
clientID = "YOUR_CLIENT_ID";
clientSecret = "YOUR_CLIENT SECRET";
foodId = '33691';
barcodeGTIN = '';


// FOR ACCESS TOKEN API
var optionsToken = {
  method: "POST",
  url: "https://oauth.fatsecret.com/connect/token",
  method: "POST",
  auth: {
    user: clientID,
    password: clientSecret,
  },
  headers: { "content-type": "application/json" },
  form: {
    grant_type: "client_credentials",
    scope: "basic",
  },
  json: true,
};



// FOR ACCESS TOKEN
route.get('/token', async (req, res) => {

  request(optionsToken, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  });
  
});


// FOR FOOD.GET route
route.get('/foodGet', async (req, res) => {

  
// For Food Get API
var optionsFoodGet = {
  method: "POST",
  url: "https://platform.fatsecret.com/rest/server.api",
  method: "POST",
  headers: { "content-type": "application/json", "Authorization": `${req.headers.authorization}` },
  form: {
    method: "food.get.v2",
    food_id: `${foodId}`,
    format: "json"
  },
  json: true,
};

  request(optionsFoodGet, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  });
  
});


route.get('/foodBarcode', async (req, res) => {

  // FOR FOOD.FIND ID FOR BARCODE API
  var optionsBarcode = {
  method: "POST",
  url: "https://platform.fatsecret.com/rest/server.api",
  method: "POST",
  headers: { "content-type": "application/json", "Authorization": `${req.headers.authorization}` },
  form: {
    method: "food.find_id_for_barcode",
    barcode: `${barcodeGTIN}`,
  },
  json: true,
  };

  request(optionsBarcode, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  });
  
});

module.exports = route;
