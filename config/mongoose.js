const mongoose = require('mongoose')

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

module.exports = db