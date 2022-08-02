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

const actionEditProject = (project) => {
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

export const thunkGetAllProjects = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/projects/all/${ownerId}`);

  if (response.ok) {
    const projects = await response.json();
    dispatch(actionGetAllProjects(projects));
  }
};
