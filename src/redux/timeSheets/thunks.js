// import { getTimeSheetPending, getTimeSheetSuccess, getTimeSheetError } from './actions';

// export const getTimeSheet = () => {
//   return (dispatch) => {
//     dispatch(getTimeSheetPending());
//     return fetch(`${process.env.REACT_APP_API_URL}/employees`)
//       .then((response) => response.json())
//       .then((response) => {
//         dispatch(getTimeSheetSuccess(response.data));
//         return response.data;
//       })
//       .catch((error) => {
//         dispatch(getTimeSheetError(error.toString()));
//       });
//   };
// };
