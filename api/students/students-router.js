const router = require('express').Router();
const Student = require('./students-model.js');
const bcrypt = require('bcryptjs');
const getToken = require('./getStudentToken');
const { restricted, only } = require('../auth/auth-middleware');
const { 
    checkUsernameExists,
    checkClassIdExists,
    checkUsernameAvailable,
    validateUser,
    validateAddResv,
    checkClassFull, } = require('./students-middleware');

// [POST] students/register *open
router.post('/register', 
validateUser, 
checkUsernameAvailable, 
(req, res, next) =>{
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    Student.insertStudent({ username, password: hash})
    .then(newStudent => {
      res.json({
          message: `${newStudent.username} successfully registered! `
      })
    })
    .catch(next)
  });


// [POST] students/login *open
router.post('/login', 
validateUser, 
checkUsernameExists, 
(req, res, next) => {
    if(bcrypt.compareSync(req.body.password, req.student.password, )) {
        const token = getToken(req.student)
        res.json({
          status: 200,
          message: `Welcome ${req.student.username}!`,
          token
        })
      } else {
        next({ status: 401, message: 'Invalid credentials'})
      }
});

  // [GET] /classes *open
router.get('/classes', (req, res, next) => { 
  Student.getClasses()
    .then(classes => {
      res.json(classes);
    })
    .catch(next);
});


  // [GET] /classes/:class_id *restricted/for students
router.get('/classes/:class_id',
restricted,
only('student'),
checkClassIdExists,
 (req, res, next) => {
    Student.findByClassId(req.params.class_id)
    .then(selectedClass => {
        res.json(selectedClass)
    })
    .catch(next)
});

// [GET] /student_id/classes *restricted/for students
router.get('/:student_id/classes',
restricted,
only('student'), 
(req, res, next) => {
    Student.getAllResv(req.params.student_id)
    .then(reservations => {
        res.json(reservations)
    })
    .catch(next)
})

// [POST] /add/:class_id *restricted/for students
router.post('/add/:class_id', 
restricted, 
only('student'),
checkClassIdExists, 
validateAddResv, 
checkClassFull, (req, res, next) => {
    const student_id = req.decodedToken.student_id;
    const class_id = req.params.class_id;

    Student.addResv(student_id, class_id)
    .then(resvClass => {
        res.json({
            message: `reservation for ${resvClass.class_name} successful`
        })
    })
    .catch(next)
})


// [DELETE] /remove/:class_id *restricted/for students
router.delete('/remove/:class_id', 
restricted, 
only('student'),
checkClassIdExists, 
(req, res, next) => {
    Student.deleteResv(req.decodedToken.student_id, req.params.class_id)
    .then(() => {
        res.json({ message: `class removed`})
    })
    .catch(next)
})


module.exports = router;
