/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const classes = [
{ 
  class_name: 'After Work HIIT', 
  class_start_time: '06:30', 
  class_category: 'HIIT',
  class_duration: 90,
  class_level: 'intermediate',
  class_location: 'uptown studio',
  max_students: 12,
  instructor_id: 1
},
{ 
  class_name: 'Balance and Stability', 
  class_start_time: '5:30', 
  class_category: 'Yoga',
  class_duration: 35,
  class_level: 'beginner',
  class_location: 'uptown studio',
  instructor_id: 2
},
{ 
  class_name: 'Stretch and Lengthen', 
  class_start_time: '09:00', 
  class_category: 'Yoga',
  class_duration: 60,
  class_level: 'beginner',
  class_location: 'uptown studio',
  max_students: 10,
  instructor_id: 1
},
{ 
  class_name: 'Serious Sculpt', 
  class_start_time: '03:00', 
  class_category: 'Strength',
  class_duration: 120,
  class_level: 'advanced',
  class_location: 'downtown studio',
  instructor_id: 2
},
{ 
  class_name: 'HIIT Legs and Abs', 
  class_start_time: '07:00', 
  class_category: 'HIIT',
  class_duration: 85,
  class_level: 'advanced',
  class_location: 'downtown studio',
  max_students: 12,
  instructor_id: 1
},
]

exports.classes = classes

exports.seed = function(knex) {
  return knex('classes').del()
    .then(function () {
      return knex('classes').insert(classes);
    });
};
