import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectSuccess,
  deleteProjectError,
  deleteProjectPending
} from './actions';

export const getProjects = () => {
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
    dispatch(deleteProjectPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteProjectSuccess(_id));
    } catch (error) {
      dispatch(deleteProjectError(error.toString()));
    }
  };
};

