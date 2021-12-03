// define express, mongoose, handlebars
const express = require('express')
const handlebarsModule = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const todoModel = require('./models/todoModel')
// define a set of routes
const routes = require('./routes')

// define port, database_port, database_name
const port = 3500
const dbPort = 27017
const dbName = 'srello-list'


// mongoose.pluralize(null);
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
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
  extname: '.hbs'
})

app.engine('.hbs', handlebars.engine)
app.set('views', process.cwd() + '/views')
app.set('view engine', '.hbs')


app.use('/', express.static('public'))

// enable method-override function 
app.use('/', methodOverride('_method'))

// set urlencoder in express
app.use('/', express.urlencoded({ extended: true }))


app.use('/', routes)

// express server is listening
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})