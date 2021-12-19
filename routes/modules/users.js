const express = require('express')
const router = express.Router()


const todoModel = require('../../models/todoModel')


router.get('/login', (req, res) => {
  res.render('login')
})



exports = module.exports = router