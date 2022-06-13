import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsSuccess,
  deleteProjectsError,
  deleteProjectsPending
} from './actions';

export const getProject = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

export const deleteProject = (_id) => {
  return async (dispatch) => {
    if (confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProjectsPending());
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
          method: 'DELETE'
        });
        dispatch(deleteProjectsSuccess(_id));
      } catch (error) {
        dispatch(deleteProjectsError(error.toString()));
      }
    }
  };
};
