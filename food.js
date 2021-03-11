const express = require("express");
const fs = require('fs');
const path = require('path');
const route = new express.Router();

var request = require("request");

route.get("/", async (request, response) => {

    response.sendFile( path.join( __dirname, '/home.html') );

});

//set your data
clientID = "96a033ae333645abae4b24c0f2109061";
clientSecret = "699c278daf7642438d6454ad0bfcd241";
foodId = '33691';
barcodeGTIN = '025293001497';

// FOR ACCESS TOKEN API FOOD GET
var optionsTokenFoodGet = {
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



// FOR ACCESS TOKEN FODD GET
route.get('/token', async (req, res) => {

  request(optionsTokenFoodGet, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  });
  
});

// FOR ACCESS TOKEN API FOOD BARCODE
var optionsTokenFoodBarcode = {
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
    scope: "barcode",
  },
  json: true,
};



// FOR ACCESS TOKEN FODD BARCODE
route.get('/tokenBarcode', async (req, res) => {

  request(optionsTokenFoodBarcode, function (error, response, body) {
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
    format: 'json'
  },
  json: true,
  };

  request(optionsBarcode, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  });
  
});

module.exports = route;
