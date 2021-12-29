const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const todoModel = require('../todoModel')
const userModel = require('../users.js')
const utilTypes = require('util').types

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config({ path: '../../.env' })
}

const db = require('../../config/mongoose')
// 從json來定義假使用者

const users = require('./users.json').results




db.once('open', async () => {

  function generateTodos(userId) {

    return Promise.all(Array.from(
      { length: 10 },
      (_, i) => todoModel.create({ name: `name-${i}`, userId })
    ))
  }

  const requests = users.map((user) => {
    const { email, name, password } = user

    return userModel.findOne({ email })
      .then(user => {

        if (user) {
          const userId = user._id
          return generateTodos(userId)

        }
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => {
            return userModel.create({
              email,
              name,
              password: hash
            })
              .then(user => {
                const userId = user._id
                return generateTodos(userId)
              })
          })

      })

  })

  Promise.all(requests)
    .then(() => {
      console.log('All seed data have been done')
      db.close()
    })







})

