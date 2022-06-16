import React from 'react';
import styles from './listSAdmins.module.css';
import Row from '../../../Shared/Row/Row';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSuperAdmin } from '../../../../redux/superAdmins/thunks';

const ListSAdmin = ({ setShowForm, setPreviousSuperAdmin, setShowModal, setChildrenModal }) => {
  const dispatch = useDispatch();
  const superAdmins = useSelector((state) => state.superAdmins.list);
  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove the super admin?')) {
      dispatch(deleteSuperAdmin(_id));
      setShowModal(true);
      setChildrenModal('Super Admin Deleted Successfully');
    }
  };

  const handleEdit = (superAdmin) => {
    setPreviousSuperAdmin(superAdmin);
    setShowForm(true);
  };
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <th id="id">ID</th>
          <th id="firstName">First Name</th>
          <th id="lastName">Last Name</th>
          <th id="email">Email</th>
          <th id="password">Password</th>
        </thead>
        <tbody>
          {superAdmins.map((item) => (
            <Row
              key={item._id}
              data={item}
              headers={['_id', 'firstName', 'lastName', 'email', 'password']}
              deleteItem={() => handleDelete(item._id)}
              editItem={() => handleEdit(item)}
            ></Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSAdmin;
