import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProjects } from '../../../store/projects';
import { thunkGetAllTasks } from '../../../store/tasks';
import NewProjectForm from '../../Forms/NewProjectForm/NewProjectForm';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';

function TodayPage() {
  const user = useSelector((state) => state.session.user);
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllProjects(user.id));
  }, []);
  useEffect(() => {
    dispatch(thunkGetAllTasks(user.id));
  }, []);

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
            <div>
              <span>{project.name}</span>
              <ul>
                {taskArr.map((task) => {
                  console.log('task', task);
                  if (task.projectId === project.id) {
                    return <li>{task.name}</li>;
                  }
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default TodayPage;
