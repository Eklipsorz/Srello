const passport = require('passport')
const { Strategy } = require('passport-local')

// define mongoose and mongoose model
const mongoose = require('mongoose')
const userModel = require('../models/users')

// app object loads passport and its setting
function usePassport(app) {

  // initialize passport and its session settings
  app.use(passport.initialize())
  app.use(passport.session())

  // define the settings of passport-local authentication
  passport.use(new Strategy({ usernameField: 'email' }, (email, password, done) => {
    userModel.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        } else if (user.password != password) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        } else {
          return done(null, user)
        }

      })
      .catch(error => done(error))

  }))

  // define passport serialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // define passport deserialization
  passport.deserializeUser((id, done) => {
    userModel.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}

exports = module.exports = usePassport 