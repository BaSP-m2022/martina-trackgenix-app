import {
  getTimeSheetPending,
  getTimeSheetSuccess,
  getTimeSheetError,
  deleteTimeSheetSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending
} from './actions';

export const getTimeSheet = () => {
  return async (dispatch) => {
    dispatch(getTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheet`);
      const res = await response.json();
      dispatch(getTimeSheetSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getTimeSheetError(error.toString()));
    }
  };
};

export const deleteTimeSheet = (_id) => {
  return async (dispatch) => {
    dispatch(deleteTimeSheetPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheet/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteTimeSheetSuccess(_id, 'Deleted Successfully'));
    } catch (error) {
      dispatch(deleteTimeSheetError(error.toString()));
    }
  };
};
