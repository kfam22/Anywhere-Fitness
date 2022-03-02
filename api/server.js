const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const studentRouter = require('./students/students-router')


server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/students', studentRouter)



module.exports = server
