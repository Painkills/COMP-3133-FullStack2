const express = require('express');
const userModel = require('../models/User');
const seed = require('../data/userData')
const app = express();

app.post('/user', async (req, res) => {
    var new_user = new userModel(req.body);
    try {
        new_user.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send(new_user);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

app.post('/seed', async (req, res) => {
    userModel.create(seed, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Database seeded successfully.')
        }
    })
})

app.get('/users', async (req, res) => {
    const users = await userModel.find({})
    console.log(users)
    try {
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = app