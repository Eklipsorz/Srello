// define express, mongoose, handlebars
const express = require('express')
const handlebarsModule = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')

// loads flash
const flash = require('connect-flash')

// loads passport
const usePassport = require('./config/passport')



const todoModel = require('./models/todoModel')

// define mongoose settings
const db = require('./config/mongoose')

// define a set of routes
const routes = require('./routes')

// define port, database_port, database_name
const port = process.env.PORT || 3500


// settings in express server
const app = express()

const handlebars = handlebarsModule.create({
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partitals',
  defaultLayout: 'main',
  extname: '.hbs'
})

app.engine('.hbs', handlebars.engine)
app.set('views', process.cwd() + '/views')
app.set('view engine', '.hbs')

app.use('/', express.static('public'))


app.use('/', session({
  secret: 'ThesecretCat',
  resave: false,
  saveUninitialized: false
}))


// enable method-override function 
app.use('/', methodOverride('_method'))

// set urlencoder in express
app.use('/', express.urlencoded({ extended: true }))


usePassport(app)
app.use(flash())
app.use((req, res, next) => {

  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.failure_msg = req.flash('error')
  console.log('failure ', res.locals.failure_msg)
  next()
})




app.use('/', routes)

// express server is listening
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})