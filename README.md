# Welcome! To Mapi.com

Welcome to Mapi.com! This is a Flask-based web application designed to help users manage their tasks effectively.

# Netlify Link
https://taskmap.netlify.app/

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots](#screenshots)

<!-- ## Features

- User registration and authentication
- Creating, updating, and deleting tasks
- Filtering tasks by various criteria (e.g., status, start date, board name)
- Generating pie charts to visualize task status distribution
Sure, here's a brief functionality overview that you can include in your repository:

--- -->

## Features


1. **User Registration and Authentication:** Users can securely register for new accounts and authenticate themselves to access the application.

2. **Task Management:** Users can create, update, and delete tasks as needed. Each task can include details such as task name, description, start date, end date, assigned person, and task status.

3. **Task Filtering:** Tasks can be filtered based on various criteria such as status (e.g., completed, in progress), start date, end date, board name, and person allocated.

4. **Visualization:** The application provides visual aids to help users better understand their task status distribution. Users can generate pie charts to visualize the distribution of tasks across different statuses.

5. **API Endpoints:** The Task Manager App offers a set of API endpoints to interact with the application programmatically. These endpoints enable functionalities such as user registration, task creation, task updates, task deletion, and task filtering.

6. **Backend Technologies:** The backend of the application is built using Python and Flask, a micro web framework. MongoDB is used as the database to store task data, while Flask-JWT-Extended is utilized for JWT token-based authentication.

7. **Frontend (Optional):** While the backend is implemented using Flask, the frontend can be developed using various technologies such as HTML, CSS, JavaScript, chart.js.


## Installation

To run the Task Manager App locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/8309h/mapi.com.git
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the following variables to the `.env` file:

     ```plaintext
     DATABASE_URL=<your_database_url>
     SECRET_KEY=<your_secret_key>
     ```

   Replace `<your_database_url>` with the URL of your MongoDB database and `<your_secret_key>` with a secure secret key for JWT token generation.

4. Start the Flask server:

   ```bash
   python app.py
   ```

5. Access the Task Manager App at `http://localhost:5000` in your web browser.

## Usage

- Register a new user account or log in with an existing account.
- Create, update, delete, and view tasks.
- Filter tasks by status, start date, board name, and other criteria.
- Generate pie charts to visualize task status distribution.

## Endpoints

The Task Manager App provides the following API endpoints:

- `POST /api/users/register`: Register a new user account.
- `POST /api/users/login`: Log in with an existing user account.
- `POST /api/tasks`: Create a new task.
- `GET /api/tasks`: Retrieve all tasks belonging to the logged-in user.
- `PUT /api/tasks/<task_id>`: Update an existing task.
- `DELETE /api/tasks/<task_id>`: Delete a task.
- `PUT /api/tasks/<task_id>/complete`: Mark a task as completed.
- `GET /api/tasks/sort`: Sort tasks by start date.
- `GET /api/tasks/filter`: Filter tasks by status.
- `GET /api/tasks/filter-by-board`: Filter tasks by board name.
- `GET /api/tasks/filter-by-name`: Filter tasks by person name.
- `GET /api/tasks/search`: Search tasks by task name.
- `GET /api/tasks/pie-chart`: Generate a pie chart to visualize task status distribution.

## Technologies Used

### Backend

- **Python**: Programming language used for backend development.
- **Flask**: Micro web framework used for building the web application.
- **MongoDB**: NoSQL database used for storing task data.
- **Flask-JWT-Extended**: Extension for JWT token-based authentication.
- **Flask-CORS**: Extension for handling Cross-Origin Resource Sharing.
- **Matplotlib**: Library used for generating pie charts.

### Frontend

- *Your frontend technologies here (e.g., HTML, CSS, JavaScript, chart.js,)*

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).


## Screenshots

### Mapi.com Dashboard

![Task Manager Dashboard](./Frontend/opscreen/screencapture-127-0-0-1-5502-Frontend-index-html-2024-02-17-13_15_54.png)

### Register Page

![Task Creation Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-register-html-2024-02-16-15_06_49.png)

### Login Page

![Task Details Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-login-html-2024-02-16-15_20_51.png)

### Work Management Page

![Task Creation Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-wk-mngt-html-2024-02-16-14_48_08.png)

### Card Page

![Task Details Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-wk-task-html-2024-02-16-15_08_00.png)

### Table Page

![Task Details Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-wk-task-tab-html-2024-02-16-15_08_31.png)

### Ghant Page

![Task Details Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-wk-task-chart-html-2024-02-16-15_09_45.png)

### Pie Chart Page

![Task Details Page](./Frontend/opscreen/screencapture-127-0-0-1-5500-Frontend-pages-wk-task-pie-html-2024-02-16-15_10_37.png)

