const db = require('../data/db-config');

function getClasses() {
    return db('classes');
}

function findClassById(class_id) {
    return db('classes')
    .where('class_id', class_id)
    .first();
}

function findBy(user) {
    return db('students')
    .where('username', user)
    .first();
}

 // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD

async function insertStudent(student) {
  const [newStudent] = await db('students').insert(student, ['student_id', 'username', 'password', 'role'])
  return newStudent
}

async function getAllResv(student_id) {
    return await db('classes as c')
    .join('reservations as r', 'c.class_id', 'r.class_id')
    .where('r.student_id', student_id)
}

async function addResv(student_id, class_id) {
    const resvDetails = { student_id, class_id }
    const [ newResv ] = await db('reservations').insert(resvDetails, ['reservation_id', 'class_id'])
    
    let resvClass = await db('classes')
    .where('class_id', newResv.class_id)
    .first()

    const newClassTotal = await db('reservations').where('class_id', class_id)

    await db('classes')
    .where('class_id', class_id)
    .update('total_students', resvClass.total_students = newClassTotal.length)

    return db('classes')
        .select(
            'class_id',
            'class_name',
            'class_category',
            'class_start_time',
            'class_duration',
            'total_students'
        )
        .where('class_id', newResv.class_id)
        .first()
}

async function getResvClass (student_id, class_id){
    const classes = await getAllResv(student_id)
    const selectClass = classes.filter(cls => {
        return cls.class_id === Number(class_id)
    })
    return selectClass[0];
}

async function deleteResv(student_id, class_id){
    const classToDel = await getResvClass(student_id, class_id)

    await db('classes')
    .where('class_id', class_id)
    .update('total_students', classToDel.total_students - 1 )

    return db('reservations')
    .where('reservation_id', classToDel.reservation_id)
    .del()
}
  
module.exports = {
    getClasses,
    findClassById,
    findBy,
    insertStudent,
    getAllResv,
    addResv,
    getResvClass,
    deleteResv
}