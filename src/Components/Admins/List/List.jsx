import React from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { deleteAdmins } from '../../../redux/admins/thunks';

const List = ({
  // setShowModal,
  // setChildrenModal,
  setShowForm,
  setPreviousAdmin,
  setMethod
}) => {
  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins.list);

  // const handleDelete = async (_id) => {
  //   dispatch(deleteAdminsPending());
  //   if (confirm('Are you sure you want to remove the Admin?')) {
  //     try {
  //       await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
  //         method: 'DELETE'
  //       });
  //       setShowModal(true);
  //       dispatch(deleteAdminsSuccess(_id));
  //       setChildrenModal('Admin deleted successfully');
  //     } catch (error) {
  //       setShowModal(true);
  //       setChildrenModal(error.msg);
  //       dispatch(deleteAdminsError(error));
  //     }
  //   }
  // };

  const handleDelete = async (_id) => {
    dispatch(deleteAdmins(_id));
  };

  const handleEdit = (admin) => {
    setMethod('PUT');
    setPreviousAdmin(admin);
    setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="firstName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="phone">Phone</th>
            <th id="email">Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={['_id', 'firstName', 'lastName', 'phone', 'email']}
                deleteItem={() => handleDelete(item._id)}
                editItem={() => handleEdit(item)}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
