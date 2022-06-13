import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  addSuperAdminsPending,
  addSuperAdminsSuccess,
  addSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  editSuperAdminsPending,
  editSuperAdminsSuccess,
  editSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return (dispatch) => {
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

export const deleteSuperAdmins = (_id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteSuperAdminsSuccess(_id));
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};

export const addSuperAdmins = (superAdmins) => {
  return async (dispatch) => {
    dispatch(addSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: superAdmins.firstName,
          lastName: superAdmins.lastName,
          phone: superAdmins.phone,
          email: superAdmins.email,
          password: superAdmins.password,
          active: superAdmins.active
        })
      });
      const res = await response.json();
      dispatch(addSuperAdminsSuccess(res.data));
    } catch (error) {
      dispatch(addSuperAdminsError(error.toString()));
    }
  };
};

export const editSuperAdmins = (superAdmins) => {
  return async (dispatch) => {
    dispatch(editSuperAdminsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admins/${superAdmins._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            firstName: superAdmins.firstName,
            lastName: superAdmins.lastName,
            phone: superAdmins.phone,
            email: superAdmins.email,
            password: superAdmins.password,
            active: superAdmins.active
          })
        }
      );
      const res = await response.json();
      dispatch(editSuperAdminsSuccess(res.data));
    } catch (error) {
      dispatch(editSuperAdminsError(error.toString()));
    }
  };
};
