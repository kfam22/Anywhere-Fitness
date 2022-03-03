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

  const checkUsernameAvailable = async (req, res ,next) => {
      try{
        const student = await Student.findBy(req.body.username)
        if(student) {
            next({ status: 422, message: `${student.username} is not available, choose a different username.`})
        } else {
            next()
        }
      } catch (err) {
          next(err)
      }
  }

  function validateUser(req, res, next) {
    if(req.body.username
    && req.body.username.trim()
    && req.body.password)
    {
      req.body.username = req.body.username.trim();
      next();
    } else {
      next({
        status: 400,
        message: "username and password required"
      })
    }
  }

  module.exports = {
      checkUsernameExists,
      checkUsernameAvailable,
      validateUser,
  }