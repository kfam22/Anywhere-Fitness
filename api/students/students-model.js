const db = require('../data/db-config');

function getClasses() {
    return db('classes');
}

function getClassById(class_id) {
    return db('classes')
    .where('class_id', class_id);
}


// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

// server.get('/api/users', async (req, res) => {
//     res.json(await getAllUsers())
//   })
  
//   server.post('/api/users', async (req, res) => {
//     res.status(201).json(await insertUser(req.body))
//   })







module.exports = {
    getClasses,
    getClassById
}