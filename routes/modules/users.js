const express = require('express')
const router = express.Router()


const todoModel = require('../../models/todoModel')
const userModel = require('../../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  userModel.findOne({ email })
    .then(user => {

      if (user) {
        console.log('user exists')
        res.render('register', { name, email, password, confirmPassword })
      } else {

        const newUser = new userModel({ name, email, password })
        return newUser.save()
          .then(() => res.redirect('/'))
          .catch((error) => console.log(error))
      }
    })

})

exports = module.exports = router