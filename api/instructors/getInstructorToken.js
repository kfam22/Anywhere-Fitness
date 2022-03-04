const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

function getInstructorToken(instructor) {
  const payload = {
    instructor_id: instructor.instructor_id,
    username: instructor.username,
    role: instructor.role
  };
  const options = {
    expiresIn: '1d'
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = getInstructorToken;