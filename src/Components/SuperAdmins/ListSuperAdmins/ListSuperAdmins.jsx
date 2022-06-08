import React from 'react';
import styles from './listSAdmins.module.css';
import Row from '../../Shared/Row/Row';

const ListSAdmin = ({
  list,
  deleteItem,
  setShowModal,
  setShowTitle,
  setShowFormEdit,
  setPreviewSuperAdmin,
  setLoading
}) => {
  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setShowTitle('Super Admin deleted successfully');
      setLoading(false);
      deleteItem(_id);
    } catch (error) {
      setShowModal(true);
      setShowTitle(error.msg);
      setLoading(false);
      console.error(error);
    }
  };

  const handleEdit = (superAdmin) => {
    setPreviewSuperAdmin(superAdmin);
    setShowFormEdit(true);
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
          {list.map((item) => (
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
