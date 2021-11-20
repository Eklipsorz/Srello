// define express, mongoose, handlebars
const express = require('express')
const handlebarsModule = require('express-handlebars')
const mongoose = require('mongoose')


// define port, database_port, database_name
const port = 3500
const dbPort = 27017
const dbName = 'srello-list'






// settings in mongodb

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


// settings in express server
const app = express()

const handlebars = handlebarsModule.create({
  layoutsDir: "views/layouts",
  defaultLayout: "main",
  extname: "hbs"
})

app.set("views", process.cwd() + "/views")
app.set("view engine", handlebars)
app.engine("hbs", handlebars.engine)

app.use("/", express.static('public'))



// routes in express server
app.get('/', (req, res) => {
  res.send('hi')
})


// express server is listening
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})