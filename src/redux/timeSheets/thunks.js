// import { addTimeSheetSuccess, addTimeSheetPending, addTimeSheetError } from './actions';

// export const getTimeSheet = () => {
//   return (dispatch) => {
//     dispatch(addTimeSheetPending());
//     return fetch(`${process.env.REACT_APP_API_URL}/time-sheet`)
//       .then((response) => response.json())
//       .then((response) => {
//         dispatch(addTimeSheetSuccess(response.data));
//         return response.data;
//       })
//       .catch((error) => {
//         dispatch(addTimeSheetError(error.toString()));
//       });
//   };
// };

// export const addTimeSheet = async (timeSheet) => {
//   return (dispatch) => {
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         timeSheet
//       })
//     };

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheet`, options);
//       const res = await response.json();
//       if (response.status !== 201 && response.status !== 200) {
//         dispatch(addTimeSheetError(res.data));
//       } else {
//         setShowForm(false);
//         setShowModal(true);
//         setChildrenModal(res.message);
//         dispatch(action(newBody));
//         cleanFields();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };
// };
