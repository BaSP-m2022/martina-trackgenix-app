import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError,
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

export const addProject = (list, project) => {
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
          employees: list
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

export const editProject = (project, id, list) => {
  return async (dispatch) => {
    dispatch(editProjectPending());
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
          active: project.active,
          employees: list
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
