const db = require('../data/db-config')

function getClasses(instructor_id){
    return db('classes')
        .where('instructor_id', instructor_id)
}

function findClassById(class_id){
    return db('classes')
    .where('class_id', class_id)
    .first();
}

// async function getClass(instructor_id, class_id){
//     const allClasses = await getClasses(instructor_id)
//     const oneClass = allClasses.filter(eachClass => {
//         return eachClass.class_id === parseInt(class_id)
//     })
//     return oneClass[0]
// }

function findBy(user){
    return db('instructors')
    .select('instructor_id', 'username', 'role', 'password')
    .where('username', user)
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

async function deleteClass(class_id){
    return db('classes')
    .where('class_id', class_id)
    .del()
}

function updateClass(body){
    return db('classes')
        .where('class_id', body.class_id)
        .update(body)
}

module.exports = {
    getClasses,
    findBy,
    createClass,
    deleteClass,
    updateClass,
    // getClass,
    findClassById,
    insertInstructor,
}