require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL
const routes = require('./routes/productRoutes')

// Connect DB
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('connected')
  }
)
const database = mongoose.connection
const app = express()

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})
// Middleware
app.use(cors())
app.use(express.json())
//app.use('/', routes)
app.use('/', require('./routes/productRoutes'))

app.listen(process.env.PORT || 8800, (err) => {
  if (err) throw err
  console.log('Server started')
})
