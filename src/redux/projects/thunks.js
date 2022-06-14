import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsSuccess,
  deleteProjectsError,
  deleteProjectsPending
} from './actions';

export const getProject = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const res = await response.json();
      dispatch(getProjectsSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (_id) => {
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteProjectsSuccess(_id));
    } catch (error) {
      dispatch(deleteProjectsError(error.toString()));
    }
  };
};

