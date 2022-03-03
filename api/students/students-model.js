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

// server.get('/api/users', async (req, res) => {
//     res.json(await getAllUsers())
//   })
  
//   server.post('/api/users', async (req, res) => {
//     res.status(201).json(await insertUser(req.body))
//   })







module.exports = {
    getClasses,
    findClassById,
    findBy,
    insertStudent,
}