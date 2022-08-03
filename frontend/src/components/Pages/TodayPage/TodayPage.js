import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteProject } from '../../../store/projects';
import { thunkDeleteTask } from '../../../store/tasks';
import EditTaskForm from '../../Forms/EditTaskForm';
import NewProjectForm from '../../Forms/NewProjectForm/NewProjectForm';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';

function TodayPage() {
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [viewEdit, setViewEdit] = useState(false);

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
              </span>
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
                          <button onClick={() => setViewEdit(true)}>
                            Edit Task
                          </button>
                          {viewEdit && <EditTaskForm taskProp={task} />}
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
