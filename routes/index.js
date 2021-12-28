const express = require('express')
const homeRoutes = require('./modules/home')
const todosRoutes = require('./modules/todos')
const usersRoutes = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const router = express.Router()
const auth = require('./modules/auth')


router.use('/todos', authenticator, todosRoutes)
router.use('/users', usersRoutes)
router.use('/auth', auth)
router.use('/', authenticator, homeRoutes)


module.exports = router