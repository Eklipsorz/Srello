// define express, mongoose, handlebars
const express = require('express')
const handlebarsModule = require('express-handlebars')
const mongoose = require('mongoose')
const todoModel = require('./models/todoModel')

// define port, database_port, database_name
const port = 3500
const dbPort = 27017
const dbName = 'srello-list'






// settings in mongodb



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
  layoutsDir: "views/layouts",
  defaultLayout: "main",
  extname: ".hbs"
})

app.engine(".hbs", handlebars.engine)
app.set("views", process.cwd() + "/views")
app.set("view engine", ".hbs")


app.use("/", express.static('public'))



// routes in express server
app.get("/", (req, res) => {

  todoModel.find()
    .lean()
    .exec()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))

})


// express server is listening
app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})