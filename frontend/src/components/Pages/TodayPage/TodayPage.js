import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteProject } from '../../../store/projects';
import {
  thunkDeleteTask,
  actionDeleteTasksByProjId,
} from '../../../store/tasks';
import EditTaskForm from '../../Forms/EditTaskForm';
import EditProjectForm from '../../Forms/EditProjectForm';
import NewProjectForm from '../../Forms/NewProjectForm/';
import NewTaskForm from '../../Forms/NewTaskForm/';

function TodayPage({ viewNewTaskForm, setViewNewTaskForm }) {
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [viewEditTask, setViewEditTask] = useState(false);
  const [viewEditProject, setViewEditProject] = useState(false);
  const [viewNewProjectForm, setViewNewProjectForm] = useState(false);

  let projArr;
  if (projects) {
    projArr = Object.values(projects);
  }
  let defaultId;
  if (projArr.length > 0) {
    defaultId = projArr[0].id;
  }
  let taskArr;
  if (tasks) {
    taskArr = Object.values(tasks);
  }
  return (
    <div>
      <button onClick={() => setViewNewProjectForm(!viewNewProjectForm)}>
        New Project
      </button>

      {viewNewProjectForm ? (
        <NewProjectForm setViewNewProjectForm={setViewNewProjectForm} />
      ) : null}
      {viewNewTaskForm ? (
        <NewTaskForm
          defaultId={defaultId}
          setViewNewTaskForm={setViewNewTaskForm}
        />
      ) : null}

      {projArr.length > 0 &&
        projArr.map((project) => {
          return (
            <div key={project.id}>
              <span>
                {project.name} - {project.id}{' '}
                <button
                  onClick={() => {
                    dispatch(thunkDeleteProject(project.id));
                    dispatch(actionDeleteTasksByProjId(project.id));
                  }}
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
