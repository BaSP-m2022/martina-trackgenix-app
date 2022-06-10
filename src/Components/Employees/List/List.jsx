import React from 'react';
import styles from './List.module.css';
import Row from '../../Shared/Row/Row';

const List = ({
  list,
  deleteItem,
  setShowModal,
  setChildrenModal,
  setIsLoading,
  setShowForm,
  setPreviewsEmployee,
  setMethod
}) => {
  const handleDelete = async (_id) => {
    setIsLoading(true);
    if (confirm('Are you sure you want to remove the Employee?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
          method: 'DELETE'
        });
        setShowModal(true);
        setChildrenModal('Employee deleted successfully');
        deleteItem(_id);
      } catch (error) {
        setShowModal(true);
        setChildrenModal(error.msg);
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  const handleEdit = (employee) => {
    setMethod('PUT');
    setPreviewsEmployee(employee);
    setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="first_name">First Name</th>
            <th id="last_name">Last Name</th>
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
                headers={['_id', 'first_name', 'last_name', 'phone', 'email']}
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
