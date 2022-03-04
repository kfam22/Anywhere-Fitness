const db = require('../data/db-config')

function findClassById(class_id){
    return db('classes')
    .where('class_id', class_id)
    .first();
}

module.exports = {
    findClassById
}