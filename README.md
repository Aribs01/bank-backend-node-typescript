# Bank Backend Using Node (Typescript)

## A RESTful API made with [Node.js](https://nodejs.org/) - [TypeScript](https://www.typescriptlang.org/) - [MySQL](https://www.postgresql.org/) - [Express](http://expressjs.com/) - [Knex](http://knexjs.org/) - [JWT](https://jwt.io/)
<br>

## Main Features 👥 🏡

This API is perfect for simple banking tasks, create users with accounts, create and transfer funds between users

## Installation
1. Before all, check if you have Node.js and npm installed, going on your terminal and typing:
    - **`node --version`**
    - **`npm --version`**

2. If these commands are unrecognized by your terminal, go to **[Node.js](https://nodejs.org/en/download/)** page to download and install it. Then go to step 1 again.

3. After that, you can clone the project to your local machine using:
    - **`git clone https://github.com/Aribs01/bank-backend-node-typescript`**
    - Or if you prefer to download it, just click on the green Code button above and click in **`Download ZIP`**

4. Now you have to enter the project folder and open it on your prefered IDE. I strongly recommend **[Microsoft Visual Studio Code](https://code.visualstudio.com/)**:
    - Just **`cd Authorization-master`** if you are running through terminal, and then **`code .`** to open the project folder on VS Code.

5. Open the terminal inside the IDE (usually **`Ctrl + J`** in VS Code on Windows) and then type the command for the package manager to download the necessary dependencies for the project to work.
    - **`npm install`**

6. Now you have to setup the environment variables by creating a **`.env`** at the root of the project.

7. Paste the blank **`.env`** variables below inside the **`.env`** file you created. Don't worry about this now, you will change and understand them:

    ```
    API_HOST=127.0.0.1
    API_PORT=3000

    NODE_ENV=development

    DB_NAME=put_the_username_you_want_for_the_database
    DB_USER=put_the_username_you_want_for_the_database
    DB_PASS=put_the_password_you_want_for_the_database

    ```
8. Now I'll explain you each one of these variables and their function in the application: Note that all variables will be converted to `string` when read by the dotenv module.
    - **`API_HOST`** is the host that the server will use to listen the requests you make to the API. Be careful if you want to change it!
    - **`API_PORT`** is the port that the server will use to listen the requests you make to the API. You can keep 3000 or change to anyone you want. But be careful!
    - **`NODE_ENV`** is the environment of the API. You can change it to `development` or `staging` or `production`, but make this before starting the API.
    - **`DB_NAME`** is the name of the database, used when you are in a `staging` or `production` environment. `development` uses a local SQLite3 database.
    - **`DB_USER`** is the username used to connect to the database specified above.
    - **`DB_PASS`** is the password used to connect to the database specified above.

9. After setting all the variables in the **`.env`** file, you only need to run the API. I will teach you below.

## Routes 🌐
The routes below are used to take information from and to the API resources.
<br>
**Note:** Before all routes below it's present the **`/api`** route.
<br>
| METHOD | ROUTE | DESCRIPTION | TABLE |

| **POST** | **`/users/auth`** | Used by the user to log in and have access granted to all routes. | 

| **POST** | **`/users/signup`** | Used by the user to sign up and have access granted to all routes. | 

| **GET** | **`/users`** | Get All Users. | 

| **GET** | **`/users/:id`** | Get Single Users By User_id. | 

| **POST** | **`/wallet`** | Used to fund user account. |


## About Me 👨🏻‍💻
Prolific, Full Stack Web Developer with a passion for building very efficient, problem solving systems Worked on several Enterprise Level Applications, including the Electronic Financial Statement Filing System being used by the Corporate Affairs Corporation. Consistently receive high user experience scores for all web development projects. Passionate about building world class web applications.
<br>
- [LinkedIn](linkedin.com/in/aribisala-abiola-8a557611b/)
- [Github](github.com/aribs01/)
