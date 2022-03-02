/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const students = [
  { username: 'Juliet', password: '123', role: 'student'},
  { username: 'Heron', password: '123', role: 'student'},
  { username: 'Cassie', password: '123', role: 'student'},
  { username: 'Maddie', password: '123', role: 'student'},
  { username: 'Lexi', password: '123', role: 'student'},
  { username: 'Nate', password: '123', role: 'student'},
  { username: 'Kody', password: '123', role: 'student'},
  { username: 'Rose', password: '123', role: 'student'},
  { username: 'Leah', password: '123', role: 'student'},
]

exports.students = students

exports.seed = function(knex) {
  return knex('students').del()
    .then(function () {
      return knex('students').insert(students);
    });
};
