import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  deleteTasksPending,
  deleteTasksSuccess,
  deleteTasksError,
  addTasksPending,
  addTasksSuccess,
  addTasksError,
  editTasksPending,
  editTasksSuccess,
  editTasksError
} from './actions';

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const response_1 = await response.json();
      dispatch(getTasksSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(getTasksError(error.toString()));
    }
  };
};

export const deleteTasks = (_id) => {
  return async (dispatch) => {
    dispatch(deleteTasksPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteTasksSuccess(_id));
    } catch (error) {
      dispatch(deleteTasksError(error.toString()));
    }
  };
};

export const addTasks = (task) => {
  return async (dispatch) => {
    dispatch(addTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ description: task.description })
      });
      const res = await response.json();
      dispatch(addTasksSuccess(res.data));
    } catch (error) {
      dispatch(addTasksError(error.toString()));
    }
  };
};

export const editTasks = (task) => {
  return async (dispatch) => {
    dispatch(editTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ description: task.description })
      });
      const res = await response.json();
      dispatch(editTasksSuccess(res.data));
    } catch (error) {
      dispatch(editTasksError(error.toString()));
    }
  };
};
