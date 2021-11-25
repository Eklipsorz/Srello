
const dbPort = 27017
const dbName = 'srello-list'

const mongoose = require('mongoose')
const todoModel = require('../todoModel')
mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)

// get connection between mongodb and mongoose
const db = mongoose.connection

// 
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let index = 0; index < 10; index++) {
    todoModel.create({ name: `namet-${index}` })
  }
  console.log('done.')
})