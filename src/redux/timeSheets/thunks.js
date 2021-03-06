import {
  addTimeSheetSuccess,
  addTimeSheetPending,
  addTimeSheetError,
  editTimeSheetError,
  editTimeSheetPending,
  editTimeSheetSuccess,
  getTimeSheetPending,
  getTimeSheetSuccess,
  getTimeSheetError,
  deleteTimeSheetSuccess,
  deleteTimeSheetError,
  deleteTimeSheetPending
} from './actions';

export const addTimeSheet = (newTimeSheet) => {
  return async (dispatch) => {
    dispatch(addTimeSheetPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheet`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          employee: newTimeSheet.employee._id,
          project: newTimeSheet.project._id,
          task: newTimeSheet.task._id,
          hs_worked: newTimeSheet.hs_worked,
          timesheetDate: newTimeSheet.timesheetDate
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(
        addTimeSheetSuccess({
          _id: res.data._id,
          employee: {
            _id: newTimeSheet.employee._id,
            first_name: newTimeSheet.employee.first_name
          },
          project: {
            _id: newTimeSheet.project._id,
            project_name: newTimeSheet.project.project_name
          },
          task: {
            _id: newTimeSheet.task._id,
            description: newTimeSheet.task.description
          },
          hs_worked: newTimeSheet.hs_worked,
          timesheetDate: newTimeSheet.timesheetDate
        })
      );
      return {
        error: false,
        message: res.message
      };
    } catch (error) {
      dispatch(addTimeSheetError());
      return {
        error: true,
        message: error
      };
    }
  };
};

export const editTimeSheet = (newTimeSheet) => {
  return async (dispatch) => {
    dispatch(editTimeSheetPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/time-sheet/${newTimeSheet._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            employee: newTimeSheet.employee._id,
            project: newTimeSheet.project._id,
            task: newTimeSheet.task._id,
            hs_worked: newTimeSheet.hs_worked,
            timesheetDate: newTimeSheet.timesheetDate
          })
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(
        editTimeSheetSuccess({
          _id: res.data._id,
          employee: {
            _id: newTimeSheet.employee._id,
            first_name: newTimeSheet.employee.first_name
          },
          project: {
            _id: newTimeSheet.project._id,
            project_name: newTimeSheet.project.project_name
          },
          task: {
            _id: newTimeSheet.task._id,
            description: newTimeSheet.task.description
          },
          hs_worked: newTimeSheet.hs_worked,
          timesheetDate: newTimeSheet.timesheetDate
        })
      );
      return {
        error: false,
        message: res.message
      };
    } catch (error) {
      dispatch(editTimeSheetError());
      return {
        error: true,
        message: error
      };
    }
  };
};

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
      dispatch(deleteTimeSheetSuccess(_id));
    } catch (error) {
      dispatch(deleteTimeSheetError(error.toString()));
    }
  };
};
