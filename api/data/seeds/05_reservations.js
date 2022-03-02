/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const reservations = [
  { student_id: 1, class_id: 2},
  { student_id: 1, class_id: 3},
  { student_id: 2, class_id: 1},
  { student_id: 3, class_id: 3},
  { student_id: 3, class_id: 5},
  { student_id: 4, class_id: 2},
  { student_id: 4, class_id: 4},
  { student_id: 4, class_id: 1},
  { student_id: 5, class_id: 1},
  { student_id: 6, class_id: 5},
  { student_id: 6, class_id: 4},
  { student_id: 7, class_id: 1},
  { student_id: 7, class_id: 4},
  { student_id: 8, class_id: 2},
  { student_id: 8, class_id: 4},
  { student_id: 9, class_id: 1},
  { student_id: 9, class_id: 2}
]

exports.reservations = reservations

exports.seed = function(knex) {
  return knex('reservations').del()
    .then(function () {
      return knex('reservations').insert(reservations);
    });
};
