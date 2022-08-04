import { useState } from 'react';
import { useSelector } from 'react-redux';

import ProjectView from '../../Elements/ProjectView';
import NewProjectForm from '../../Forms/NewProjectForm/';
import NewTaskForm from '../../Forms/NewTaskForm/';

function TodayPage({ viewNewTaskForm, setViewNewTaskForm }) {
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);

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
          return <ProjectView project={project} taskArr={taskArr} />;
        })}
    </div>
  );
}

export default TodayPage;
