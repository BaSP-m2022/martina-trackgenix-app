import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  changeStatusAdminsPending,
  changeStatusAdminsSuccess,
  changeStatusAdminsError,
  addAdminPending,
  addAdminSuccess,
  addAdminError,
  editAdminPending,
  editAdminSuccess,
  editAdminError
} from 'redux/admins/actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const res = await response.json();
      dispatch(getAdminsSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
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

export const changeStatus = (id, status) => {
  return async (dispatch) => {
    dispatch(changeStatusAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          active: status
        })
      });
      const res = await response.json();
      dispatch(changeStatusAdminsSuccess(res.data));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(changeStatusAdminsError(error.toString()));
      console.error(error);
      return { error: true, message: error };
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
          active: true
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addAdminSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(addAdminError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const editAdmin = (admin, _id) => {
  return async (dispatch) => {
    dispatch(editAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          phone: admin.phone,
          email: admin.email,
          active: true
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editAdminSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(editAdminError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};
