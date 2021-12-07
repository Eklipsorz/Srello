const mongoose = require('mongoose')

const dbPort = 27017
const dbName = 'srello-list'

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:${dbPort}/${dbName}`
// mongoose.pluralize(null);
mongoose.connect(MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db