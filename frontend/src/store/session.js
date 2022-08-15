import { thunkCreateProject } from './projects';

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_THEME_USER = 'session/UPDATE_THEME_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const updateTheme = (user) => ({
  type: UPDATE_THEME_USER,
  payload: user,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
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

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, iconUrl, theme) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        icon_url: iconUrl,
        theme,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      const defaultProject = {
        ownerId: data.id,
        name: 'Inbox',
        color: '#5297FF',
        view: false,
      };
      dispatch(thunkCreateProject(defaultProject));
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

export const updateUserTheme = (user) => async (dispatch) => {
  const response = await fetch('/api/users/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(updateTheme(user));
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case UPDATE_THEME_USER: {
      const newState = JSON.parse(JSON.stringify(state));
      const user = action.payload;
      newState.user = { ...user };
      return newState;
    }
    default:
      return state;
  }
}
