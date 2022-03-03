const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets')
const Student = require('./students-model')

const checkUsernameExists = async (req, res, next) => {
      try{
        const student = await Student.findBy(req.body.username)
        if (!student) {
          next({ status: 401, message: 'Invalid credentials'})
        } else {
          req.student = student
          next()
        }
     } catch (err) {
       next(err)
     }
  }

  module.exports = {
      checkUsernameExists
  }