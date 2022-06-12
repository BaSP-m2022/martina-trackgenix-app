import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError,
  addAdminsPending,
  addAdminsSuccess,
  addAdminsError,
  editAdminsPending,
  editAdminsSuccess,
  editAdminsError
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

export const deleteAdmins = (_id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteAdminsSuccess(_id));
    } catch (error) {
      dispatch(deleteAdminsError(error.toString()));
    }
  };
};

export const addAdmins = (admin) => {
  return async (dispatch) => {
    dispatch(addAdminsPending());
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
      dispatch(addAdminsSuccess(res.data));
    } catch (error) {
      dispatch(addAdminsError(error.toString()));
    }
  };
};

export const editAdmins = (admin) => {
  return async (dispatch) => {
    dispatch(editAdminsPending());
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
      dispatch(editAdminsSuccess(res.data));
    } catch (error) {
      dispatch(editAdminsError(error.toString()));
    }
  };
};
