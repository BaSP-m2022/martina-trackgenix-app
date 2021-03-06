import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  addSuperAdminPending,
  addSuperAdminSuccess,
  addSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError,
  editSuperAdminPending,
  editSuperAdminSuccess,
  editSuperAdminError
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getSuperAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

export const deleteSuperAdmin = (_id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteSuperAdminSuccess(_id));
    } catch (error) {
      dispatch(deleteSuperAdminError(error.toString()));
    }
  };
};

export const addSuperAdmin = (superAdmin) => {
  return async (dispatch) => {
    dispatch(addSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addSuperAdminSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(addSuperAdminError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const editSuperAdmin = (superAdmin, _id) => {
  return async (dispatch) => {
    dispatch(editSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editSuperAdminSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(editSuperAdminError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};
