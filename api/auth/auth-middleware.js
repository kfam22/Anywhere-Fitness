const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

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
      restricted,
      only
  }