import React from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';

const List = ({
  list,
  deleteItem,
  setShowModal,
  setChildrenModal,
  setIsLoading,
  setShowForm,
  setPreviousAdmin,
  setMethod
}) => {
  const handleDelete = async (_id) => {
    setIsLoading(true);
    if (confirm('Are you sure you want to remove the Admin?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
          method: 'DELETE'
        });
        setShowModal(true);
        setChildrenModal('Admin deleted successfully');
        deleteItem(_id);
      } catch (error) {
        setShowModal(true);
        setChildrenModal(error.msg);
        console.error(error);
      }
    }
    setIsLoading(false);
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
          {list.map((item) => {
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
