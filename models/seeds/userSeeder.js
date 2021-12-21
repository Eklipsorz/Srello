const mongoose = require('mongoose')
const db = require('../../config/mongoose')
const users = require('./users.json').results

const userModel = require('../users')



db.once('open', async () => {
  await userModel.create(users)
  console.log('The seed users have been built!!')
  db.close()
})