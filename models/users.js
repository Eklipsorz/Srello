const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
  test1: { type: String, ref: 'todo' },
  test2: { type: Schema.Types.ObjectId, ref: 'todo' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

console.log('test1: ', userSchema.path('test1'))
console.log('test2: ', userSchema.path('test2'))
exports = module.exports = mongoose.model('User', userSchema)