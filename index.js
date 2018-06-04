"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

//scrapping

restService.post("/echo", function(req, res) {
	var url = "https://www.capgemini.com/our-company/"
    request(url,function(err,resp,body){
	var $ = cheerio.load(body);
	var details = $('.card__media-overlapping__text');
	var fulfillmentText = details.text() ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";

  return res.json({
    fulfillmentText: fulfillmentText,
    //displayText: fulfillmentText,
    source: "webhook-echo-sample"
  });
});
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});