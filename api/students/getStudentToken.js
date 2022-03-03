const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

function getStudentToken(student) {
  const payload = {
    student_id: student.student_id,
    username: student.username,
    role: student.role
  };
  const options = {
    expiresIn: '1d'
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = getStudentToken;