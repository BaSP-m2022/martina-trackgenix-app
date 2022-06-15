import React from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { deleteAdmin } from '../../../redux/admins/thunks';

const List = ({ setShowForm, setPreviousAdmin }) => {
  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins.list);

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove the Admin?')) {
      dispatch(deleteAdmin(_id));
    }
  };

  const handleEdit = (admin) => {
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
