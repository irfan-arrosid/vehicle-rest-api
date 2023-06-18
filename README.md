# VEHICLE REST API

## Description:

Vehicle REST API is a project that provides API services for managing vehicle data such as vehicle brands, vehicle types, vehicle models, vehicle years, and vehicle price lists. The project is built using Node.js with the Express framework and utilizes PostgreSQL database with the help of the Sequelize ORM. This API leverages the concept of RESTful API to provide endpoints that allow users to perform operations such as creating, reading, updating, and deleting vehicle data.

# Instructions:

## Preparation:

- Make sure Node.js and PostgreSQL are installed on your system.
- Create a PostgreSQL database to be used for this project.
- Copy the source code of the Vehicle REST API project to your working directory.
- Open the terminal and navigate to the project directory.

## Configuration:

- Open the .env file and ensure that the database configuration is correctly set according to your PostgreSQL settings.
- If needed, adjust other values such as JWT_SECRET for the JWT token.

## Install Dependencies:

- Run the command npm install to install all the dependencies required by the project.

## Database Migration:

- Import the SQL file in terminal using command `\i vehicle-seru.sql`

## Running the Server:

- Run the command npm start to start the API server.
- The server will run at http://localhost:3000.

## Using the API:

- To utilize the API, you can use an application or software that supports API testing such as Postman or cURL.
- Import the Postman Collection file into your Postman software.

## Testing and Development:

- If you want to run the project in development mode, you can use the command `npm run dev` which uses nodemon to monitor changes in the source code and automatically restart the server.

# Enjoy using the Vehicle REST API! If you have any questions or encounter any issues, feel free to ask for further assistance.
