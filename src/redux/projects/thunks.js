import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError,
  changeStatusPending,
  changeStatusSuccess,
  changeStatusError,
  addProjectPending,
  addProjectSuccess,
  addProjectError,
  editProjectPending,
  editProjectSuccess,
  editProjectError
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

export const addProject = (project, employees) => {
  return async (dispatch) => {
    dispatch(addProjectPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          project_name: project.project_name,
          client: project.client,
          start_date: project.start_date,
          finish_date: project.finish_date,
          active: true,
          employees
        })
      });
      const res = await response.json();
      dispatch(addProjectSuccess(res.data));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(addProjectError(error.toString()));
      return { error: true, message: error };
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
      return {
        error: false
      };
    } catch (error) {
      dispatch(deleteProjectError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const changeStatus = (id, status) => {
  return async (dispatch) => {
    dispatch(changeStatusPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          active: status
        })
      });
      const res = await response.json();
      dispatch(changeStatusSuccess(res.data));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(changeStatusError(error.toString()));
      console.error(error);
      return { error: true, message: error };
    }
  };
};

export const editProject = (project, id, employees) => {
  return async (dispatch) => {
    dispatch(editProjectPending());
    console.log('EDITED PROJECT:', project);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          project_name: project.project_name,
          client: project.client,
          start_date: project.start_date,
          finish_date: project.finish_date,
          employees
        })
      });
      const res = await response.json();
      dispatch(editProjectSuccess(res.data));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(editProjectError(error.toString()));
      return { error: true, message: error };
    }
  };
};
