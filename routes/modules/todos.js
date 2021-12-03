const express = require('express')
const router = express.Router()

const todoModel = require('../../models/todoModel')




// redirect to add-todo page
router.get('/new', (req, res) => {
  res.render('new')
})

// add a new todo
router.post('/', (req, res) => {
  const name = req.body.name
  const newTodo = new todoModel({ name })

  // insert a new document into the collecion via model
  return newTodo.save()
    .then(res.redirect('/'))
    .catch(error => console.log(error))

})


// redirect to edit-todo page
router.get('/:id/edit', (req, res) => {

  const id = req.params.id
  todoModel.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})



// view the todo with id 
router.get('/:id', (req, res) => {

  const id = req.params.id
  todoModel.findById(id)
    .lean()
    .exec()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})


// update todo page
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body


  todoModel.findById(id)
    .exec()
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})


// remove a todo
router.delete('/:id', (req, res) => {
  const id = req.params.id

  todoModel.findById(id)
    .exec()
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})






module.exports = router