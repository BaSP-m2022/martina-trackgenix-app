import { getAdminsPending, getAdminsSuccess, getAdminsError } from './actions';

const getAdminsFetch = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());

    getAdminsFetch()
      .then((data) => {
        dispatch(getAdminsSuccess(data));
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};
