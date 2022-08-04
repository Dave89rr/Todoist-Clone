// import classes from './ProjectView.module.css';
import EditProjectForm from '../../Forms/EditProjectForm';
import { useDispatch } from 'react-redux';
import { actionDeleteTasksByProjId } from '../../../store/tasks';
import { thunkDeleteProject } from '../../../store/projects';
import { useState } from 'react';
import TaskView from '../TaskView/TaskView';

function ProjectView({ project, taskArr }) {
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
            return <TaskView task={task} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default ProjectView;
