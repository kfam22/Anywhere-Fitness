const db = require('../data/db-config');

function getClasses() {
    return db('classes');
}

function findClassById(class_id) {
    return db('classes')
    .where('class_id', class_id);
}

function findBy(user) {
    return db('students')
    .where('username', user)
    .first()
}

 // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD

async function insertStudent(student) {
  const [newStudent] = await db('students').insert(student, ['student_id', 'username', 'password', 'role'])
  return newStudent // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

async function getAllRes(student_id) {
    return await db('classes as c')
    .join('reservations as r', 'c.class_id', 'r.class_id')
    .where('r.student_id', student_id)
}






module.exports = {
    getClasses,
    findClassById,
    findBy,
    insertStudent,
    getAllRes,
}