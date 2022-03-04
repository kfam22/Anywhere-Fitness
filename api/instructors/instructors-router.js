const router = require('express').Router();
const Instructor = require('./instructors-model');
const bcrypt = require('bcryptjs');
const getInstructorToken = require('./getInstructorToken');
const { 
    checkUsernameExists,
    validateUser,
    checkUsernameAvailable,
    restricted, 
    only 
} = require('./instructors-middleware')

// [POST] instructors/register
router.post('/register', validateUser, checkUsernameAvailable, (req, res, next) =>{
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    Instructor.insertInstructor({ username, password: hash})
    .then(newInstructor => {
      res.json({
          message: `${newInstructor.username} successfully registered! `
      })
    })
    .catch(next)
  });

//[POST] /login instructor login
router.post('/login', validateUser, checkUsernameExists, (req, res, next) => {
    console.log("bcrypt", bcrypt.compareSync(req.body.password, req.instructor.password))
    if(bcrypt.compareSync(req.body.password, req.instructor.password)) {
        const token = getInstructorToken(req.instructor)
            res.json({
                message: `Welcome ${req.instructor.username}!`, 
                instructor_id: `${req.instructor.instructor_id}`,
                token
            })
    } else {
        next({
            message: 'Invalid login'
        })
    }

    next()
})


//[GET] /:instructor_id/classes *get all classes by instructor_id*
router.get('/:instructor_id/classes/', 
    restricted, only('instructor'), 
    (req, res, next) => { 
        Instructor.getClasses(req.params.instructor_id)
            .then(myClasses => {
                res.json(myClasses)
            })
            .catch(next)
})

//[GET] /classes/:class_id *restricted for instructor*
router.get('/classes/:class_id', restricted, (req, res, next) => {
    Instructor.findClassById(req.params.class_id)
        .then(selectedClass => {
            res.json(selectedClass)
        })
        .catch(next)
})


//[POST] /create *restricted for instructor to create new class*
router.post('/add', 
    restricted, 
    only('instructor'), 
    (req, res, next) => { 
        Instructor.createClass(req.body)
            .then(newClass => {
                res.json(newClass)
            })
            .catch(next)
})

//[PUT] /:instructor_id/update/:class_id *restricted for instructor to update/modify classes*
router.put('/update', (req, res, next) => {
    // res.json({ 
    //     message: 'class was updated'
    // })

    Instructor.updateClass(req.body)
        .then(updatedClass => {
            // console.log('what is updatedClass', updatedClass);
            res.json({
                message: 'Class was successfully updated!'
            })
        })
        .catch(next)
})

//[DELETE] /delete/class_id *restricted for instructor to delete a class*
router.delete('/delete/:class_id', 
    restricted, 
    only('instructor'), 
    (req, res, next) => {
        Instructor.deleteClass(req.params.class_id)
            .then(deleted => {
                res.json({
                    message: 'Class was successfully deleted'
                })
            })
            .catch(next)
})

module.exports = router;