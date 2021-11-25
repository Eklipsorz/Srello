// define express, mongoose, handlebars
const express = require('express')
const handlebarsModule = require('express-handlebars')
const mongoose = require('mongoose')
const todoModel = require('./models/todoModel')

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


// set urlencoder in express
app.use('/', express.urlencoded({ extended: true }))

// routes in express server
app.get('/', (req, res) => {

  todoModel.find()
    .lean()
    .exec()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))

})

app.get('/todos/:id', (req, res) => {

  const id = req.params.id

  todoModel.findById(id)
    .lean()
    .exec()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

// add a new todo
app.post('/todos', (req, res) => {
  const name = req.body.name
  const newTodo = new todoModel({ name })

  // insert a new document into the collecion via model
  return newTodo.save()
    .then(res.redirect('/'))
    .catch(error => console.log(error))

})

// express server is listening
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})