Student/Instructor Portal base url:https://anywhere-fitness-04.herokuapp.com/api <br/>
Quick View classes (JSON): https://anywhere-fitness-04.herokuapp.com/api/students/classes

[GET]/students/classes (no auth needed)
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

Student’s Login/Register Endpoint
[POST]/students/register
Takes body with the following format:

```
{
	"username": "test",
	"password": "123"
}
```
username & password must be all strings
username must be unique
Returns the following:
```
{
	"message": "test successfully registered!"
}
```
[POST]/students/login
Takes in req.body with the following format:

```
{ 
	"username": "test", 
	"password": "123"
}
```
will return the following:
```
{
	"message": "Welcome test!",
	"token": "string"
}
```
JWT (token) expires in 1 day

Student Endpoints *restricted

[GET]/students/classes/:class_id
restricted endpoint - gets an individual class by class_id
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
[GET]/students/:student_id/classes
restricted endpoint - gets all classes that are reserved by student id
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

[POST]/students/add/:class_id
restricted endpoint - adds a new class to the student’s reservation list by the class_id
doesn't require a body
total class size will increment by 1 each time a student reserves a class
will return the following:
```
{
    "message": "reservation for Balance and Stability successful"
}
```
[DELETE]/students/:student_id/remove/class_id
restricted endpoint - deletes a class reservation for the studenr by a class id
total class size will decrement by 1 whenever a student deletes the class from their reservation list
don’t need to send anything - it will need to be routed properly
will return the following:
```
{
	"message": "class removed"
}
```
Instructors Endpoints (restricted)
Instructors Log-In Credentials
use the following instructors credentials to log-in:
```
{ "username": "Stella", "password": "123" }
{ "username": "Vivienne", "password": "123" }
{ "username": "Kayla", "password": "123" }
```
[GET]/instructors/login
restricted endpoint for instructors only
Takes body with the following format:
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
[GET]/instructors/:instructor_id/classes
restricted endpoint for only instructors
gets all classes by instructor
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
[GET] /instructors/classes/:class_id
restricted endpoint for instructors only
get a class by id
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
[POST]/instructors/add
restricted endpoint for instructors only
create a new class
class start time format: HH:MM
class duration format (minutes): must be an integer
max class size format: must be an integer
class level format: must be a string
Takes in body with the following format:
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
[PUT]/instructors/update
restricted endpoint for instructors only
instructor can modify a class by the class id
Takes in body with the following format:
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
[DELETE]/instructors/delete/:class_id
restricted endpoint for instructors only
instructor deletes a class by class id
Return the following:
```
{
	"message": "Class deleted!"
}
```
