// define express, handlebars
const express = require('express')


// define port
const port = 3500


// create app with express object
const app = express()

app.get('/', (req, res) => {
  res.send('hi')
})


app.listen(port, () => {
  console.log(`The express server is running at ${port}`)
})