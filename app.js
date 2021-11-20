// define express, mongoose, handlebars
const express = require('express')
const mongoose = require('mongoose')


// define port, database_port, database_name
const port = 3500
const dbPort = 27017
const dbName = 'srello-list'


// create app with express object
const app = express()


// connect to mongodb
mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)


// get connection between mongodb and mongoose
const db = mongoose.connection

// 
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('hi')
})


app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})