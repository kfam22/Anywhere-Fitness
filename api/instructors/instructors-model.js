const db = require('../data/db-config')

function getClasses(instructor_id){
    return db('classes')
        .where('instructor_id', instructor_id)
}

//find by username
function findBy(filter){
    return db('instructors')
    .select('instructor_id', 'username', 'role', 'password')
    .where('username', filter)
    .first();
}

//find by instructor id
function findByInstId(filter){
    return db('instructors')
    .select('instructor_id', 'username', 'role', 'password')
    .where('instructor_id', filter)
    .first();
}

//find by class id
function findByClassId(filter){
    return db('classes')
    .where('class_id', filter)
    .first();
}

async function insertInstructor(instructor) {
    const [newInstructor] = await db('instructors')
    .insert(instructor, 
        ['instructor_id', 
        'username', 
        'password', 
        'role'])
        return newInstructor
  }

async function createClass(classDetails){
    const [newClass] = await db('classes').insert(classDetails, [
        'class_id',
        'class_name',
        'class_start_time',
        'class_category',
        'class_duration',
        'class_level',
        'class_location',
        'max_students',
        'instructor_id'
    ])
    return newClass
}

function updateClass(body){
    return db('classes')
        .where('class_id', body.class_id)
        .update(body)
}

 function deleteClass(class_id){
    return db('classes')
    .where('class_id', class_id)
    .del()
}

module.exports = {
    getClasses,
    findBy,
    findByInstId,
    findByClassId,
    createClass,
    deleteClass,
    updateClass,
    insertInstructor,
}