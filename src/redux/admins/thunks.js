import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  addAdminPending,
  addAdminSuccess,
  addAdminError,
  editAdminPending,
  editAdminuccess,
  editAdminError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

export const deleteAdmin = (_id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteAdminSuccess(_id));
    } catch (error) {
      dispatch(deleteAdminError(error.toString()));
    }
  };
};

export const addAdmin = (admin) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          phone: admin.phone,
          email: admin.email,
          password: admin.password,
          active: admin.active
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addAdminSuccess(res.data));
    } catch (error) {
      dispatch(addAdminError(error.toString()));
    }
  };
};

export const editAdmin = (admin) => {
  return async (dispatch) => {
    dispatch(editAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          phone: admin.phone,
          email: admin.email,
          password: admin.password,
          active: admin.active
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editAdminuccess(res.data));
    } catch (error) {
      dispatch(editAdminError(error.toString()));
    }
  };
};
