"use strict";

var express = require("express");
var restService = express();
const bodyParser = require("body-parser");
const cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

var url = "https://www.capgemini.com/our-company/"
request(url,function(err,resp,body){
	var $ = cheerio.load(body);
	var details = $('.card__media-overlapping__text');
	global.fulfillmentText = details.text();
	//console.log(detailstext);
});

restService.post("/echo", function(req, res) {
  // var fulfillmentText =
  //   req.body.queryResult &&
  //   req.body.queryResult.parameters &&
  //   req.body.queryResult.parameters.echoText
  //     ? req.body.queryResult.parameters.echoText
  //     : "Seems like some problem. Speak again.";
  return res.json({
    fulfillmentText: fulfillmentText,
    //displayText: fulfillmentText,
    source: "webhook-echo-sample"
  });
});
restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
