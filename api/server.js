const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const studentRouter = require('./students/students-router')
const instructorRouter = require('./instructors/instructors-router')


server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/students', studentRouter)
server.use('/api/instructors', instructorRouter)

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
