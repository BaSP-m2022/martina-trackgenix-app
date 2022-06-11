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
  return (dispatch) => {
    dispatch(deleteAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteAdminsSuccess(_id));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteAdminsError(error.toString()));
      });
  };
};

export const addAdmins = (admin) => {
  return (dispatch) => {
    dispatch(addAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins`, {
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
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(addAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(addAdminsError(error.toString()));
      });
  };
};

export const editAdmins = (admin) => {
  return (dispatch) => {
    dispatch(editAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, {
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
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(editAdminsSuccess(admin._id));
        return response.data;
      })
      .catch((error) => {
        dispatch(editAdminsError(error.toString()));
      });
  };
};
