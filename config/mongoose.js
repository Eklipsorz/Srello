const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_HOST + ':'
  + process.env.MONGODB_HOSTPORT + '/'
  + process.env.MONGODB_DB

mongoose.connect(MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db