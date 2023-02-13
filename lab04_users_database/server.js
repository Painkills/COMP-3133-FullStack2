const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');

const app = express();
app.use(express.json()); // Make sure it comes back as json

const SERVER_PORT = 3000

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://temp:9GW3DWTtGAn.D9@cluster0.qibcjdv.mongodb.net/fs2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Connected to Mongodb successfully')
}).catch(err => {
  console.log('Error connecting to Mongodb')
});

app.use(userRouter);

app.listen(SERVER_PORT, () => { console.log(`Server is running on ${SERVER_PORT}` ) });