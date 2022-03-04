const Class = require('./classes-model');

const checkClassIdExists = async (req, res, next) => {
    try{
        const classId = await Class.findByClassId(req.params.class_id)
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

module.exports = {
    checkClassIdExists
}