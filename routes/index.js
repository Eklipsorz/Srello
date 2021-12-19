const express = require('express')
const homeRoutes = require('./modules/home')
const todosRoutes = require('./modules/todos')
const usersRoutes = require('./modules/users')

const router = express.Router()

router.use('/', homeRoutes)
router.use('/todos', todosRoutes)
router.use('/users', usersRoutes)

module.exports = router