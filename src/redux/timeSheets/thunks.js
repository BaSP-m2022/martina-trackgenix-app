import {
  getTimeSheetPending,
  getTimeSheetSuccess,
  getTimeSheetError,
  deleteTimeSheetSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending
} from './actions';

export const getTimeSheet = () => {
  return (dispatch) => {
    dispatch(getTimeSheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/time-sheet`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTimeSheetSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTimeSheetError(error.toString()));
      });
  };
};

export const deleteTimeSheet = (_id) => {
  return async (dispatch) => {
    if (confirm('Are you sure you want to delete this Time-Sheet')) {
      dispatch(deleteTimeSheetPending());
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
          method: 'DELETE'
        });
        dispatch(deleteTimeSheetSuccess(_id));
      } catch (error) {
        dispatch(deleteTimeSheetError(error.toString()));
      }
    }
  };
};
