const express = require('express')
const homeRoutes = require('./modules/home')
const todosRoutes = require('./modules/todos')
const router = express.Router()

router.use('/', homeRoutes)
router.use('/todos', todosRoutes)


module.exports = router