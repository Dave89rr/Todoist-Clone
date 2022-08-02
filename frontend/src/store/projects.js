//**************** TYPES ************************************//

const CREATE_PROJECT = 'project/CREATE_PROJECT';

const GET_PROJECT = 'project/GET_PROJECT';

const GET_ALL_PROJECTS = 'project/GET_ALL_PROJECTS';

const UPDATE_PROJECT = 'project/UPDATE_PROJECT';

const DELETE_PROJECT = 'project/DELETE_PROJECT';

//**************** ACTIONS **********************************//

const actionCreateProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project,
  };
};

const actionGetProject = (project) => {
  return {
    type: GET_PROJECT,
    project,
  };
};

const actionGetAllProjects = (projects) => {
  return {
    type: GET_ALL_PROJECTS,
    projects,
  };
};

const actionUpdateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project,
  };
};

const actionDeleteProject = (projectId) => {
  return {
    type: DELETE_PROJECT,
    projectId,
  };
};

//**************** THUNKS ***********************************//

export const thunkCreateProject = (project) => async (dispatch) => {
  const response = await fetch('/api/project/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  if (response.ok) {
    const project = await response.json();
    dispatch(actionCreateProject(project));
  }
};

export const thunkGetAllProjects = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/projects/all/${ownerId}`);

  if (response.ok) {
    const projects = await response.json();
    dispatch(actionGetAllProjects(projects));
  }
};

export const thunkUpdateProject = (project) => async (dispatch) => {
  const response = await fetch('/api/w/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  if (response.ok) {
    const project = await response.json();
    dispatch(actionUpdateProject(project));
  }
};

export const thunkDeleteProject = (projectId) => async (dispatch) => {
  const response = await fetch('/api/w/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId }),
  });

  if (response.ok) {
    dispatch(actionDeleteProject(projectId));
  }
};

//**************** REDUCER **********************************//

const projects = (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CREATE_PROJECT: {
      const { project } = action;
      newState[project.id] = project;
      return newState;
    }
    case GET_PROJECT: {
      return newState;
    }
    case GET_ALL_PROJECTS: {
      const { projects } = action;
      projects.forEach((project) => {
        newState[project.id] = project;
      });
      return newState;
    }
    case UPDATE_PROJECT: {
      const { project } = action;
      newState[project.id] = { ...newState[project.id], ...project };
      return newState;
    }
    case DELETE_PROJECT: {
      delete newState[action.projectId];
      return newState;
    }
    default:
      return state;
  }
};

export default projects;
