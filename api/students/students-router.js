const router = require("express").Router();
const Students = require("./students-model.js");
// const { restricted, only } = require("../auth/auth-middleware.js");

// [POST] students/register
router.post('/register', (req, res, next) =>{
    console.log('student register is wired')
})


// [POST] students/login
router.post('/login', (req, res, next) => {
    console.log('student login is wired')
})

/**
  [GET] /api/classes

  This endpoint is OPEN: all users
  should have access.
 */
router.get('/classes', (req, res, next) => { 
  Students.getClasses()
    .then(classes => {
      res.json(classes);
    })
    .catch(next);
});

/**
  [GET] /api/classes/:class_id

  This endpoint is RESTRICTED: only authenticated users
  should have access.

  client role only

  response:
  status 200
  [
    {
      "class_id": 1,
      "class_name": "bob"
      ...class.rest
    }
  ]
 */
router.get('/class/:class_id', (req, res, next) => {
    console.log('get class by id is wired')
});

// [GET] /api/student_id/classes

//   This endpoint is RESTRICTED: only authenticated students
//   should have access.
// client role only
router.get('/:student_id/classes', (req, res, next) => {
    console.log('get classes by student\'s id is wired')
})

// [POST] /api/register/:class_id
// restricted/ only authd students can register
router.post('/register/:class_id', (req, res, next) => {
    console.log('student register for class is wired')
})


// [POST] /api/remove/:class_id
// restricted/ only authd students can register
router.delete('/remove/:class_id', (req, res, next) => {
    console.log('remove class is wired')
})


module.exports = router;
