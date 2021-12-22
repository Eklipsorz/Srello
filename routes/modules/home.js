const express = require('express')
const router = express.Router()


const todoModel = require('../../models/todoModel')

router.get('/', (req, res) => {
  const userId = req.user._id

  todoModel.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .exec()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))

})

module.exports = router