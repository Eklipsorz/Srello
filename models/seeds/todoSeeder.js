const mongoose = require('mongoose')
const todoModel = require('../todoModel')
const db = require('../../config/mongoose')


db.once('open', () => {
  for (let index = 0; index < 10; index++) {
    todoModel.create({ name: `namet-${index}` })
  }
  console.log('done.')
})