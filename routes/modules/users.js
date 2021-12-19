const express = require('express')
const router = express.Router()


const todoModel = require('../../models/todoModel')


router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

exports = module.exports = router