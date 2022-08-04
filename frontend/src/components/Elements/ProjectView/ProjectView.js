// import classes from './ProjectView.module.css';
import EditTaskForm from '../../Forms/EditTaskForm';
import EditProjectForm from '../../Forms/EditProjectForm';
import { useDispatch } from 'react-redux';
import {
  thunkDeleteTask,
  actionDeleteTasksByProjId,
} from '../../../store/tasks';
import { thunkDeleteProject } from '../../../store/projects';
import { useState } from 'react';

function ProjectView({ project, taskArr }) {
  const [viewEditTask, setViewEditTask] = useState(false);
  const [viewEditProject, setViewEditProject] = useState(false);

  const dispatch = useDispatch();

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
        <button onClick={() => setViewEditProject(!viewEditProject)}>
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
                  <button onClick={() => dispatch(thunkDeleteTask(task.id))}>
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
}

export default ProjectView;
