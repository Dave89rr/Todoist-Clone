//**************** TYPES ************************************//

const CREATE_PROJECT = 'project/CREATE_PROJECT';

// const GET_PROJECT = 'project/GET_PROJECT';

const GET_ALL_PROJECTS = 'project/GET_ALL_PROJECTS';

const UPDATE_PROJECT = 'project/UPDATE_PROJECT';

const DELETE_PROJECT = 'project/DELETE_PROJECT';

const LOGOUT = 'project/LOGOUT';

//**************** ACTIONS **********************************//

const actionCreateProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project,
  };
};

// const actionGetProject = (project) => {
//   return {
//     type: GET_PROJECT,
//     project,
//   };
// };

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

export const actionLogoutProjects = () => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

//**************** THUNKS ***********************************//

export const thunkCreateProject = (project) => async (dispatch) => {
  const response = await fetch('/api/projects/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  if (response.ok) {
    const project = await response.json();
    dispatch(actionCreateProject(project));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const thunkGetAllProjects = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/projects/all/${ownerId}`);

  if (response.ok) {
    const projects = await response.json();
    dispatch(actionGetAllProjects(projects.projects));
  }
};

export const thunkUpdateProject = (project) => async (dispatch) => {
  const response = await fetch('/api/projects/update', {
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

export const thunkDeleteProject = (id) => async (dispatch) => {
  const response = await fetch('/api/projects/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (response.ok) {
    dispatch(actionDeleteProject(id));
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
    // case GET_PROJECT: {
    //   return newState;
    // }
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
    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export default projects;
