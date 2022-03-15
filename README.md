Student/Instructor Portal base url:https://anywhere-fitness-04.herokuapp.com/api <br/>
Quick View classes (JSON): https://anywhere-fitness-04.herokuapp.com/api/students/classes

[GET]</br>
api/students/classes (no auth needed)
Returns the following format:

```[
  {
    "class_id": 1,
    "class_name": "After Work HIIT",
    "class_start_time": "06:30:00",
    "class_category": "HIIT",
    "class_duration": 90,
    "class_level": "intermediate",
    "class_location": "uptown studio",
    "total_students": 5,
    "max_students": 12,
    "instructor_id": 1
  },
  {
    "class_id": 2,
    "class_name": "Balance and Stability",
    "class_start_time": "05:30:00",
    "class_category": "Yoga",
    "class_duration": 35,
    "class_level": "beginner",
    "class_location": "uptown studio",
    "total_students": 4,
    "max_students": 8,
    "instructor_id": 2
  } 
]
```

[POST]</br>
api/students/register </br>
Requires body with the following format:

```
{
	"username": "test",
	"password": "123"
}
```
*username & password must be strings
*username must be unique
Returns the following:
```
{
	"message": "test successfully registered!"
}
```
[POST]</br>
api/students/login </br>
Requires req.body with the following format:

```
{ 
	"username": "test", 
	"password": "123"
}
```
returns the following:
```
{
	"message": "Welcome test!",
	"token": "string"
}
```
JWT (token) expires in 1 day</br>

Students Endpoints *restricted

[GET]</br>
api/students/classes/:class_id </br>
restricted endpoint - gets an individual class by class_id </br>
Returns the following:

```
[
	{
		 "class_id": 2,
   	 "class_name": "Balance and Stability",
    	"class_start_time": "05:30:00",
   	 "class_category": "Yoga",
   	 "class_duration": 35,
   	 "class_level": "beginner",
   	 "class_location": "uptown studio",
   	 "total_students": 4,
   	 "max_students": 8,
   	 "instructor_id": 2
	}
]
```
[GET]</br>
api/students/:student_id/classes </br>
restricted endpoint - gets all classes that are reserved by student id </br>
Returns the following:
```
[
	{
		"reservations_id": 1,
		"username": "test",
		"class_name": "Balance and Stability",
		"class_id": 2,
		"class_type": "Yoga",
		"class_start_time": "11:00:00",
		"class_duration": 60,
		"class_intensity_level": "beginner",
		"class_location": "Uptown Studio",
		"total_students": 4
	}
]
```

[POST]</br>
api/students/add/:class_id </br>
restricted endpoint - adds a new class to the student’s reservation list by the class_id </br>
*no request body needed </br>
total class size will increment by 1 each time a student adds a class </br>
will return the following:
```
{
    "message": "reservation for Balance and Stability successful"
}
```
[DELETE]</br>
api/students/:student_id/remove/class_id </br>
restricted endpoint - removes a class reservation for the student by a class id </br>
total class size will decrement by 1 whenever a student deletes the class from their reservations </br>
*no request body needed </br>
will return the following:
```
{
	"message": "class removed"
}
```
Instructors Endpoints (restricted) </br>
Instructors Log-In Credentials</br>
```
{ "username": "Stella", "password": "123" }
{ "username": "Vivienne", "password": "123" }
{ "username": "Kayla", "password": "123" }
```
[GET]</br>
api/instructors/login</br>
restricted endpoint for instructors only </br>
Requires body with the following format:
```
{ 
	"username": "Stella", 
	"password": "123" 
}
```
Returns the following:
```
{
    "instructor_id": "1",
    "message": "Welcome Stella!",
    "token": "string"
}
```
[GET]</br>
api/instructors/:instructor_id/classes </br>
restricted endpoint for instructors only </br>
gets all classes by instructor id </br>
Returns the following:
```
[
	{
		"instructor_id": 1,
		"username": "Stella",
		"class_id": 2,
		"class_name": "Balance and Stability'",
		"class_catgory": "Yoga",
		"class_start_time": "05:30:00",
		"class_duration": 35,
		"class_level": "beginner",
		"class_location": "Uptown Studio",
		"total_students": 0,
		"max_class_size": 8
		},
		{
   		 "instructor_id": 2,
		"class_id": 4,
    		"class_name": "Serious Sculpt",
   		 "class_start_time": "03:00:00",
   		 "class_category": "Strength",
    		"class_duration": 120,
    		"class_level": "advanced",
    		"class_location": "downtown studio",
    		"total_students": 4,
   		"max_students": 8,
	}
]
```
[GET]</br>
api/instructors/classes/:class_id </br>
restricted endpoint for instructors only </br>
gets one class by id </br>
Returns the following:
```
[
	{
		"class_id": 1,
		"class_name": "Balance and Stability",
		"class_start_time": "05:30:00",
		"class_type": "Yoga",
		"class_duration": 30,
		"class_intensity_level": 1,
		"class_location": "Uptown Studio",
		"total_students": 0,
		"max_class_size": 8,
		"instructor_id": 1
	}
]
```
[POST]</br>
api/instructors/add </br>
restricted endpoint for instructors only </br>
create a new class </br>
class start time format: HH:MM </br>
class duration format (minutes): must be an integer </br>
max class size format: must be an integer </br>
class level format: must be a string </br>
Requires body with the following format:
```
{
	"class_name": "New Class",
	"class_start_time": "05:30",
	"class_type": "Yoga",
	"class_duration": "30",
	"class_level": "beginner",
	"class_location": "Uptown Studio",
	"max_class_size": "8",
	"instructor_id": "1"
}
```
will return the following:
```
{
	"class_id": 12,
	"class_name": "New Class",
	"class_start_time": "05:30",
	"class_type": "Yoga",
	"class_duration": "30",
	"class_level": "beginner",
	"class_location": "Uptown Studio",
	"max_class_size": "8",
	"instructor_id": "1"
}
```
[PUT] </br>
api/instructors/update </br>
restricted endpoint for instructors only </br>
instructor can edit a class by the class id </br>
Requires body with the following format:
```
{
    "class_id": 12,
    "class_name": "Updating'",
    "class_start_time": "06:30:00",
    "class_type": "Update",
    "class_duration": 180,
    "class_level": "updated class level",
    "class_location": "Uptown Studio",
    "max_class_size": 8,
    "instructor_id": 1
}
```
will return the following:
```
{
	"message": "Class updated!"
}
```
[DELETE]</br>
api/instructors/delete/:class_id </br>
restricted endpoint for instructors only </br>
instructor deletes a class by class id </br>
Return the following:
```
{
	"message": "Class deleted!"
}
```
