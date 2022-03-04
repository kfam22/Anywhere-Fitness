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
    // Instructor.findBy(req.body.username)
    //     .then(instructor => {
    //         if(instructor) {
    //             req.instructor = instructor
    //             next()
    //         } else {
    //             next({
    //                 message: 'incorrect username or password'
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
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
    if(!token){
        next({
            message: 'Token is required!'
        })
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                next({
                    status: 401,
                    message: err.message
                })
            } else {
                console.log('what is req decodedJWT', req.decodedJWT);
                req.decodedJWT = decoded
                next()
            }
        })
    }
}

const only = role => (req, res, next) => {
    if(req.decodedJWT.role === role){
        next()
    } else {
        res.json({
            message: 'You do not have permission to access this'
        })
    }
}


module.exports = {
    checkUsernameExists,
    validateUser,
    checkUsernameAvailable,
    restricted,
    only
}