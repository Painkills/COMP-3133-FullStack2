const express = require('express');
const restaurantModel = require('../models/RestaurantSchema');
const seed = require('../RestaurantSeedData');
const app = express();

// Seed DB
// http://localhost:3000/seed
app.get('/seed', async (req, res) => {
    restaurantModel.create(seed, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Database seeded successfully.')
        }
    })
})


//Read ALL with optional sort (Q4 and Q6)
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
    // If there's a query for sorting, do so. If not, return all restaurants with all data.
    let restaurants
    if (req.query.sortBy) {
      restaurants = await restaurantModel.find({}).select("_id restaurant_id cuisine name city").sortByRestaurantId(req.query.sortBy)
    } else {
      restaurants = await restaurantModel.find({})
    }
    

    try {
        console.log(restaurants[0].restaurant_id)
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});


//Search By Cuisine - PATH Parameter (Q5)
//http://localhost:3000/restaurants/cuisine/Bakery
app.get('/restaurants/cuisine/:type', async (req, res) => {
  const type = req.params.type
  const restaurants = await restaurantModel.findOne().byCuisine(type)
  
  try {
    if(restaurants.length != 0){
      res.send(restaurants);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found"}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delicatessen outside Brooklyn (Q7)
//http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
  try {
    const restaurants = restaurantModel.
                        find({})
                        .where('cuisine').equals('Delicatessen')
                        .where('city').ne('Brooklyn')
                        .sort('name')
                        .select('cuisine name city')
                        .exec((err, data) => {
                          if (err){
                              res.send(JSON.stringify({status:false, message: "No data found"}));
                          }else{
                              res.send(data);
                          }
                        });
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = app