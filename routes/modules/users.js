const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()


const todoModel = require('../../models/todoModel')
const userModel = require('../../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

// successRedirect: '/',
router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


router.get('/logout', (req, res) => {
  req.flash('success_msg', '你已經成功登出。')
  req.logout()
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }

  if (errors.length) {
    console.log(errors)
    return res.render('register', { errors, name, email, password, confirmPassword })
  }


  userModel.findOne({ email })
    .then(user => {

      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash =>
          userModel.create({
            name,
            email,
            password: hash
          })
        )
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
      // else {

      //   const newUser = new userModel({ name, email, password })
      //   return newUser.save()
      //     .then(() => res.redirect('/'))
      //     .catch((error) => console.log(error))
      // }
    })

})

exports = module.exports = router