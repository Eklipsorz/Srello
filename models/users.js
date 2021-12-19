const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { tpye: String, required: true },
  createdAt: { type: Date, default: Date.now }
}

exports = module.exports = mongoose.model('User', userSchema)