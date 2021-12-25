// loads passport and passport's local strategy
const passport = require('passport')
const { Strategy } = require('passport-local')

// loads data model 
const userModel = require('../models/users')

function usePassport(app) {
  // initialize passport and passport session function
  app.use(passport.initialize())
  app.use(passport.session())

  // define a validation strategy which passport.js could use
  passport.use(new Strategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, (req, email, password, done) => {
    userModel.findOne({ email })
      // normally execute the query 
      .then(user => {
        if (!user) {
          // nothing in the database
          return done(null, false, { message: 'That email is not registered' })
        } else if (user.password != password) {
          // successfully find the user but the password user inputs is not 
          // matched with the password in the database
          return done(null, false, { message: 'Email or Password incorrect.' })
        } else {
          // successfully find the user and the password user inputs is matched 
          // with the password in the database
          return done(null, user)
        }
      })
      // something wrong in the execution of the query
      .catch(err => done(err, false))

  }))

  // define how to serialize and how to deserialize

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    userModel.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, false))
  })




}

exports = module.exports = usePassport