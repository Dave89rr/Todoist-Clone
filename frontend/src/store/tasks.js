//**************** TYPES ************************************//

const CREATE_TASK = 'task/CREATE_TASK';

const GET_TASK = 'task/GET_TASK';

const GET_ALL_TASKS = 'task/GET_ALL_TASKS';

const UPDATE_TASK = 'task/UPDATE_TASK';

const DELETE_TASK = 'task/DELETE_TASK';

//**************** ACTIONS **********************************//

const actionCreateTask = (task) => {
  return {
    type: CREATE_TASK,
    task,
  };
};

const actionGetTask = (task) => {
  return {
    type: GET_TASK,
    task,
  };
};

const actionGetAllTasks = (tasks) => {
  return {
    type: GET_ALL_TASKS,
    tasks,
  };
};

const actionUpdateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task,
  };
};

const actionDeleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId,
  };
};

//**************** THUNKS ***********************************//

export const thunkCreateTask = (task) => async (dispatch) => {
  const response = await fetch('/api/tasks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const task = await response.json();
    dispatch(actionCreateTask(task));
  }
};

export const thunkGetAllTasks = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/all/${ownerId}`);

  if (response.ok) {
    const tasks = await response.json();
    dispatch(actionGetAllTasks(tasks));
  }
};

export const thunkUpdateTask = (task) => async (dispatch) => {
  const response = await fetch('/api/w/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const task = await response.json();
    dispatch(actionUpdateTask(task));
  }
};

export const thunkDeleteTask = (taskId) => async (dispatch) => {
  const response = await fetch('/api/w/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taskId }),
  });

  if (response.ok) {
    dispatch(actionDeleteTask(taskId));
  }
};

//**************** REDUCER **********************************//

const tasks = (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CREATE_TASK: {
      return newState;
    }
    case GET_TASK: {
      return newState;
    }
    case GET_ALL_TASKS: {
      return newState;
    }
    case UPDATE_TASK: {
      return newState;
    }
    case DELETE_TASK: {
      return newState;
    }
    default:
      return state;
  }
};

export default tasks;