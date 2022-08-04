//**************** TYPES ************************************//

const CREATE_TASK = 'task/CREATE_TASK';

// const GET_TASK = 'task/GET_TASK';

const GET_ALL_TASKS = 'task/GET_ALL_TASKS';

const UPDATE_TASK = 'task/UPDATE_TASK';

const DELETE_TASK = 'task/DELETE_TASK';

const LOGOUT = 'task/LOGOUT';

const DELETE_TASKS_BY_PROJID = 'task/DELETE_TASKS_BY_PROJID';

//**************** ACTIONS **********************************//

const actionCreateTask = (task) => {
  return {
    type: CREATE_TASK,
    task,
  };
};

// const actionGetTask = (task) => {
//   return {
//     type: GET_TASK,
//     task,
//   };
// };

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

export const actionLogoutTasks = () => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

export const actionDeleteTasksByProjId = (id) => {
  return {
    type: DELETE_TASKS_BY_PROJID,
    id,
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
    dispatch(actionGetAllTasks(tasks.tasks));
  }
};

export const thunkUpdateTask = (task) => async (dispatch) => {
  const response = await fetch('/api/tasks/update', {
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

export const thunkDeleteTask = (id) => async (dispatch) => {
  const response = await fetch('/api/tasks/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (response.ok) {
    dispatch(actionDeleteTask(id));
  }
};

//**************** REDUCER **********************************//

const tasks = (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CREATE_TASK: {
      const { task } = action;
      newState[task.id] = task;
      return newState;
    }
    // case GET_TASK: {
    //   return newState;
    // }
    case GET_ALL_TASKS: {
      const { tasks } = action;
      tasks.forEach((task) => {
        newState[task.id] = task;
      });
      return newState;
    }
    case UPDATE_TASK: {
      const { task } = action;
      newState[task.id] = { ...newState[task.id], ...task };
      return newState;
    }
    case DELETE_TASK: {
      delete newState[action.taskId];
      return newState;
    }
    case DELETE_TASKS_BY_PROJID: {
      for (let key in newState) {
        if (newState[key].projectId === action.id) {
          delete newState[key];
        }
      }
      return newState;
    }
    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export default tasks;
