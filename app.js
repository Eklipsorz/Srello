// define express, mongoose, handlebars
const express = require('express')
const handlebarsModule = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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

// enable method-override function 
app.use('/', methodOverride('_method'))

// set urlencoder in express
app.use('/', express.urlencoded({ extended: true }))


// routes in express server
app.get('/', (req, res) => {

  todoModel.find()
    .lean()
    .sort({ _id: -1 })
    .exec()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))

})

// view the todo with id 
app.get('/todos/:id', (req, res) => {

  const id = req.params.id

  todoModel.findById(id)
    .lean()
    .exec()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// redirect to add-todo page
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
// redirect to edit-todo page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  todoModel.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})


// update todo page
app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body

  todoModel.findById(id)
    .exec()
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})




// remove a todo
// app.post('/todos/:id/delete', (req, res) => {
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id

  console.log('this is delete method')
  todoModel.findById(id)
    .exec()
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// express server is listening
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})