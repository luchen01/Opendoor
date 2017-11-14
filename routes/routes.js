var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var axios = require('axios');
const request=require('request');
const csv=require('csvtojson');
var Listing = require('../models').Listing;

//////////////////////////////// PUBLIC ROUTES ////////////////////////////////
// Users who are not logged in can see these routes

router.get('/', function(req, res, next) {
  res.render('home');
});

async function addDoc(listings){
  console.log("inside addDoc");
  var returnResults = [];
  for(var listing of listings){
    var newData = {
      "type": "FeatureCollection",
      "geometry": {"type": "Point", "coordinates": [listing.ing]},
      "properties": {
        "id" : listing.id,
        "price": listing.price,
        "street": listing.street,
        "bedrooms": listing.bedrooms,
        "bathrooms": listing.bathrooms,
        "sq_ft": listing.sq_ft
      }
    };
    returnResults.push(newData);
  }
  return returnResults;
}

router.get('/listings', (req, res)=>{
  var minPrice = req.query.min_price;
  var maxPrice = req.query.max_price;
  var minBed = req.query.min_bed;
  var maxBed = req.query.max_bed;
  var minBath = req.query.min_bath;
  var maxBath = req.query.max_bath;
  Listing
  .find({})
  .where('price').gte(minPrice)
  .where('price').lte(maxPrice)
  .where('bedrooms').gte(minBed)
  .where('bedrooms').lte(maxBed)
  .where('bathrooms').gte(minBath)
  .where('bathrooms').lte(maxBath)
  .exec((err, results)=>{
    addDoc(results)
    .then((returnResults)=>{
      res.json(returnResults)
    });
    })

  // csv()
  // .fromStream(request.get('https://s3.amazonaws.com/opendoor-problems/listing-details.csv'))
  // .on('csv',(csvRow)=>{
  //     // csvRow is an array
  //     var newListing = new Listing({
  //       id: csvRow[0],
  //       street: csvRow[1],
  //       status: csvRow[2],
  //       price: csvRow[3],
  //       bedrooms: csvRow[4],
  //       bathrooms: csvRow[5],
  //       sq_ft: csvRow[6],
  //       lat: csvRow[7],
  //       ing: csvRow[8]
  //     });
  //     newListing.save()
  // })
  // .on('done',(error)=>{

    });

///////////////////////////// END OF PUBLIC ROUTES /////////////////////////////

// router.use(function(req, res, next){
//   if (!req.user) {
//     res.redirect('/login');
//   } else {
//     return next();
//   }
// });

//////////////////////////////// PRIVATE ROUTES ////////////////////////////////
// Only logged in users can see these routes

router.get('/protected', function(req, res, next) {
  res.render('protectedRoute', {
    username: req.user.username,
  });
});

///////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
