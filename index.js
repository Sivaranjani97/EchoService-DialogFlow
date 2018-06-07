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


restService.post("/echo", function(req, res) {
  var intentName = req.body.queryResult.intent.displayName;

  if(intentName == "AnnualReport"){
  var url = "https://www.capgemini.com/our-company/"
  request(url,function(err,resp,body){
    var $ = cheerio.load(body);
    var details = $('.card__media-overlapping__text');
    global.fulfillmentText = details.text() ;
  
});
  
  return res.json({
    fulfillmentText: fulfillmentText,
    source: "webhook-echo-sample"
  });
}

else (intentName == "GooglePartner")
{
    var url = "https://www.capgemini.com/partner/google-cloud/"
  request(url,function(err,resp,body){
    var $ = cheerio.load(body);
    var details = $('.component__hero-inset--intro');
    global.fulfillmentText = details.text() ;

  
});
}
  
  return res.json({
    fulfillmentText: fulfillmentText,
    source: "webhook-echo-sample"
  });





});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
