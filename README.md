# AI Task Manager

AI Task Manager is a simple web application that allows users to create and manage their own personal task list. The application was built using AI-assisted development tools as part of my software development coursework.

## Live Application

https://radiant-sprite-843767.netlify.app

## Features

- User account registration
- User login and logout
- Create new tasks
- View saved tasks
- Mark tasks as complete or incomplete
- Edit existing tasks
- Delete tasks
- Tasks are saved in a cloud database
- Tasks remain saved after refreshing the page
- Each user can only access their own tasks

## Technologies Used

- HTML
- CSS
- JavaScript
- Supabase
- Supabase Authentication
- Supabase PostgreSQL Database
- GitHub
- Netlify
- Visual Studio Code
- AI-assisted development tools

## Database

The application uses Supabase as its backend database.

The `tasks` table stores task information including:

- Task ID
- Task description
- Completion status
- Creation date
- User ID

Each task is associated with the authenticated user who created it. Row Level Security (RLS) is used so users can only access their own tasks.

## Authentication

Supabase Authentication is used for user accounts.

Users can:

1. Create an account using an email and password.
2. Log into an existing account.
3. Access their personal task list.
4. Log out of the application.

## CRUD Functionality

The application supports the four basic CRUD operations:

- **Create:** Add a new task.
- **Read:** View tasks stored in the database.
- **Update:** Edit a task or change its completion status.
- **Delete:** Remove a task.

## How to Use the Application

1. Open the deployed application.
2. Create an account or log into an existing account.
3. Enter a task in the task input field.
4. Click **Add Task**.
5. Use **Complete** to mark a task as finished.
6. Use **Edit** to change a task.
7. Use **Delete** to remove a task.
8. Click **Log Out** when finished.

## Local Setup

To run the project locally:

1. Clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using Live Server.
4. The application will run in your web browser.

## Project Structure

- `index.html` - Contains the structure and user interface of the application.
- `style.css` - Contains the application's styling.
- `script.js` - Contains authentication, Supabase database operations, and task management functionality.
- `README.md` - Contains project documentation.

## Deployment

The application is deployed using Netlify and connected to the GitHub repository.

Live application:

https://radiant-sprite-843767.netlify.app

## Demo Video

Demo video: https://youtu.be/iUFHTWIPaBw

## Author

Matthew Ishibashi Heron
