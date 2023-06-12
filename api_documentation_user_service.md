User Service API Documentation:

CreateUser

Request:

name (string): Name of the user
email (string): Email address of the user
Response:

id (string): User ID of the created user
GetUser

Request:

id (string): User ID of the user to retrieve
Response:

id (string): User ID of the retrieved user
name (string): Name of the retrieved user
email (string): Email address of the retrieved user
DeleteUser

Request:

id (string): User ID of the user to delete
Response:

Empty response
