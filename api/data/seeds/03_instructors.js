/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const instructors = [
  { username: 'Vivienne', password: '123', role: 'instructor'},
  { username: 'Stella', password: '123', role: 'instructor'},
  { username: 'Kayla', password: '123', role: 'instructor'},
]

exports.instructors = instructors

exports.seed = function(knex) {
  return knex('instructors').del()
    .then(function () {
      return knex('instructors').insert(instructors);
    });
};
