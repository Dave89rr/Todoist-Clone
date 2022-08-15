# Machenist

> _Todoist Clone_

- 'Machenist' is a todo list making application for you to easily keep track of tasks based on projects. Create projects, and different priority tasks to organize your plans!

| React                                                                                                                                               |                                                                        Redux                                                                         |                                                                                   Flask                                                                                   | SQLAlchemy                                                                                                                                                                                  |                                                                              PostgreSQL                                                                              |                                                               Illustrator                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://reactjs.org/"><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width="75" height="75" /></a> | <a href='https://redux.js.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="75" height="75" /></a> | <a href='https://flask.palletsprojects.com/en/2.1.x/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="75" height="75"/></a> | <div align="center"><a href='https://www.sqlalchemy.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-plain.svg" width="75" height="75" /></a></div> | <a href='https://www.postgresql.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="75" height="75" /></a> | <a href='https://www.adobe.com/'> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" /></a> |

### [Live link to Machenist](https://todoist-clone-dr.herokuapp.com/)

### [Link to the Machenist Wiki](https://github.com/Dave89rr/Todoist-Clone/wiki)

### [Machenist's Features](https://github.com/Dave89rr/Todoist-Clone/wiki/Feature-List)

### [The Database Schema](https://github.com/Dave89rr/Todoist-Clone/wiki/DB-Schema)

## Development

### Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository

- Create a new branch with git checkout -b branch-name

- Make appropriate changes to the files and push back to github

- Create a Pull Request

  - Use a clear and descriptive title for the issue to identify the suggestion.

  - Include any relevant issue numbers in the PR body, not the title.

  - Provide a comprehensive description of all changes made.

## Setting Up and Starting a Local Server:

- Clone [the project](https://github.com/Dave89rr/Todoist-Clone.git).
- Create a DB and a DB User with ownership of the DB.
- Create a .env file using the .env.example provided in the project.
- cd into the fronted directory by running `cd frontend/` in your terminal then run `npm install`
- Now in the root directory run `install --python "$PYENV_ROOT/versions/3.9.4/bin/python"` followed by `pipenv shell`.
- Next you will need to set up your backend in your root terminal run `flask db migrate` followed by `flask db upgrade` and finally `flask seed all`.
  - You can now run the command `flask run` and your backend will start up connected to an already seeded database.
- Now that your backend is up and running you can open a second terminal and run `cd frontend/` followed by running `npm start`
  - This will atomatically start the application on localhost:3000 unless you have something already running on that port.

## Bugs

If you find a bug please please let me know by opening an issue [here](https://github.com/Dave89rr/Todoist-Clone/issues). Be sure to be clear in the description of the bug such as what you were doing or if you've run into it multiple times how you've managed to recreate the bug. Screenshots and/or recordings help tons to see the behavior and hopefully pinpoint what the problem might be!

## Machenist in action!

### Signup process

![image](https://user-images.githubusercontent.com/6596778/184653497-0a52e48a-4a05-48ce-bb77-9ddb220f22ad.png)

### Creating Tasks

![image](https://user-images.githubusercontent.com/6596778/184653748-5f4377fd-060d-42b3-beb4-93ae6d677962.png)

### Creating Projects

![image](https://user-images.githubusercontent.com/6596778/184653828-b969d3af-b1b0-4024-b8f0-400c20e6f5f8.png)

### Editing a task

![image](https://user-images.githubusercontent.com/6596778/184653905-a4eb2e94-668b-4bea-af54-67d454df9e87.png)

### Editing a Project

![image](https://user-images.githubusercontent.com/6596778/184654186-026d280a-7747-4476-9551-6934a5f0044f.png)

### Dark Theme

![image](https://user-images.githubusercontent.com/6596778/184654305-5e58718a-a92a-4d57-ae46-67d19e43b55c.png)

## Created By

[David Rivera](https://github.com/Dave89rr)
