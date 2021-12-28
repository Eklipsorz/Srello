// loads passport and passport's local strategy
const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy


// loads data model 
const userModel = require('../models/users')

function usePassport(app) {
  // initialize passport and passport session function
  app.use(passport.initialize())
  app.use(passport.session())

  // define a local validation strategy which passport.js could use
  passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, (req, email, password, done) => {
    userModel.findOne({ email })
      // normally execute the query 
      .then(user => {
        if (!user) {
          // nothing in the database
          return done(null, false, { message: 'That email is not registered' })
        }

        return bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (!isMatched) {
              // successfully find the user but the password user inputs is not 
              // matched with the password in the database
              return done(null, false, { message: 'Email or Password incorrect.' })
            }
            // successfully find the user and the password user inputs is matched 
            // with the password in the database
            return done(null, user)
          })
      })
      // something wrong in the execution of the query
      .catch(err => done(err, false))

  }))

  // define a Facebook validation strategy which passport.js could use
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json

    return userModel.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash =>
            userModel.create({
              email,
              name,
              password: hash
            }))
          .then(user => done(null, user))
          .catch(error => done(error, false))

      })
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