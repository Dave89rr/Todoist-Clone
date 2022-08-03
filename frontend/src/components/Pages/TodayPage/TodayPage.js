import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteProject } from '../../../store/projects';
import { thunkDeleteTask } from '../../../store/tasks';
import EditTaskForm from '../../Forms/EditTaskForm';
import EditProjectForm from '../../Forms/EditProjectForm';
import NewProjectForm from '../../Forms/NewProjectForm/';
import NewTaskForm from '../../Forms/NewTaskForm/';

function TodayPage() {
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [viewEditTask, setViewEditTask] = useState(false);
  const [viewEditProject, setViewEditProject] = useState(false);

  let projArr;
  if (projects) {
    projArr = Object.values(projects);
  }
  let taskArr;
  if (tasks) {
    taskArr = Object.values(tasks);
  }
  return (
    <div>
      <h1>New Project</h1>
      <NewProjectForm />
      <h1>New Task</h1>
      <NewTaskForm />
      {projArr.length > 0 &&
        projArr.map((project) => {
          return (
            <div key={project.id}>
              <span>
                {project.name} - {project.id}{' '}
                <button
                  onClick={() => dispatch(thunkDeleteProject(project.id))}
                >
                  Del Proj
                </button>
                <button onClick={() => setViewEditProject(true)}>
                  Edit Project
                </button>{' '}
              </span>
              {viewEditProject && <EditProjectForm projectProp={project} />}
              <ul>
                {taskArr.map((task) => {
                  if (task.projectId === project.id) {
                    return (
                      <li key={task.id}>
                        {task.name}{' '}
                        <span>
                          <button
                            onClick={() => dispatch(thunkDeleteTask(task.id))}
                          >
                            Delete
                          </button>
                          <button onClick={() => setViewEditTask(true)}>
                            Edit Task
                          </button>
                          {viewEditTask && <EditTaskForm taskProp={task} />}
                        </span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default TodayPage;
