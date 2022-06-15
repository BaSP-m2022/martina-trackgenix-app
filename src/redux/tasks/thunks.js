import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskError,
  addTaskPending,
  addTaskSuccess,
  addTaskError,
  editTaskPending,
  editTaskSuccess,
  editTaskError
} from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTasksSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTasksError(error.toString()));
      });
  };
};

export const deleteTask = (_id) => {
  return async (dispatch) => {
    dispatch(deleteTaskPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteTaskSuccess(_id));
    } catch (error) {
      dispatch(deleteTaskError(error.toString()));
    }
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch(addTaskPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ description: task.description })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addTaskSuccess(res.data));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(addTaskError(error));
      return { error: true, message: error };
    }
  };
};

export const editTask = (task) => {
  return async (dispatch) => {
    dispatch(editTaskPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ description: task.description })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editTaskSuccess(res.data));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(editTaskError(error));
      return { error: true, message: error };
    }
  };
};
