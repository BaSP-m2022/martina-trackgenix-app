import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  ADD_EMPLOYEE_PENDING,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE_PENDING,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_ERROR,
  CLEAN_EMPLOYEES_ERROR
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (employees) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: employees
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeePending = () => {
  return {
    type: DELETE_EMPLOYEE_PENDING
  };
};

export const deleteEmployeeSuccess = (employeeId) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: employeeId
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    payload: error
  };
};

export const addEmployeePending = () => {
  return {
    type: ADD_EMPLOYEE_PENDING
  };
};

export const addEmployeeSuccess = (employee) => {
  return {
    type: ADD_EMPLOYEE_SUCCESS,
    payload: employee
  };
};

export const addEmployeeError = (error) => {
  return {
    type: ADD_EMPLOYEE_ERROR,
    payload: error
  };
};

export const editEmployeePending = () => {
  return {
    type: EDIT_EMPLOYEE_PENDING
  };
};

export const editEmployeeSuccess = (employeeId) => {
  return {
    type: EDIT_EMPLOYEE_SUCCESS,
    payload: employeeId
  };
};

export const editEmployeeError = (error) => {
  return {
    type: EDIT_EMPLOYEE_ERROR,
    payload: error
  };
};

export const cleanEmployeesError = () => ({
  type: CLEAN_EMPLOYEES_ERROR
});
