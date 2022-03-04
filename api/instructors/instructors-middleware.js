const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const Instructor = require('./instructors-model')

const checkUsernameExists = async (req, res, next) => {
    try{
        const instructor = await Instructor.findBy(req.body.username)
        if (!instructor) {
          next({ status: 401, message: 'Invalid credentials'})
        } else {
          req.instructor = instructor
          next()
        }
     } catch (err) {
       next(err)
     }
}

const checkInstIdExists = async (req, res, next) => {
    try{
        const instructorId = await Instructor.findByInstId(req.params.instructor_id)
        console.log('find by instructor id', instructorId)
        if (!instructorId) {
          next({ status: 401, message: 'Invalid instructor id'})
        } else {
          next()
        }
     } catch (err) {
       next(err)
     }
}

const checkClassIdExists = async (req, res, next) => {
    try{
        const classId = await Instructor.findByClassId(req.params.class_id)
        console.log('find by class id', classId)
        if (!classId) {
          next({ status: 401, message: `Class with id ${req.params.class_id} does not exist`})
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

  const checkUsernameAvailable = async (req, res ,next) => {
    try{
      const instructor = await Instructor.findBy(req.body.username)
      if(instructor) {
          next({ status: 422, message: `${instructor.username} is not available, choose a different username.`})
      } else {
          next()
      }
    } catch (err) {
        next(err)
    }
}

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        next({
            status: 401,
            message: 'token required!'
        })
    } else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                next({
                    status: 401,
                    message: 'invalid token'
                })
            } else {
              //   console.log(decodedToken)
                req.decodedToken = decodedToken
                next()
            }
        })
    }
}

const only = role => (req, res, next) => {
    if(req.decodedToken.role === role){
        next()
    } else {
        next({
            status: 401,
            message: 'you do not have permissions'
        })
    }
}


module.exports = {
    checkUsernameExists,
    checkInstIdExists,
    checkClassIdExists,
    validateUser,
    checkUsernameAvailable,
    restricted,
    only
}