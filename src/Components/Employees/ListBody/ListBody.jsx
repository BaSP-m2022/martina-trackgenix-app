import React, { useState } from 'react';
//import ListContent from '../ListContent/ListContent';
import styles from './ListBody.module.css';
import Row from '../../Shared/Row/Row';
import EditEmployee from '../EditForm/EditForm';

const ListBody = ({
  employees,
  deleteItem,
  setShowModal,
  setShowTitle,
  editEmployee,
  setLoading
}) => {
  const [showFormEdit, setShowFormEdit] = useState(false);

  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/employee/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setShowTitle('Employee deleted successfully');
      setLoading(false);
      deleteItem(_id);
    } catch (error) {
      setShowModal(true);
      setShowTitle(error.msg);
      setLoading(false);
      console.error(error);
    }
  };

  const closeForm = () => {
    setShowFormEdit(false);
  };

  const openForm = () => {
    setShowFormEdit(true);
  };
  return (
    <div className={styles.body}>
      <table>
        <thead>
          <tr>
            <th id="_id">ID</th>
            <th id="first_name">Name</th>
            <th id="last_name">Last name</th>
            <th id="phone">Phone</th>
            <th id="email">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <Row
              key={employee._id}
              data={employee}
              headers={['_id', 'first_name', 'last_name', 'phone', 'email']}
              deleteItem={() => handleDelete(employee._id)}
              editItem={openForm}
            >
              <EditEmployee
                key={employee._id}
                show={showFormEdit}
                closeForm={closeForm}
                previewSuperAdmin={employee}
                setShowModal={setShowModal}
                setShowTitle={setShowTitle}
                editItem={editEmployee}
                setLoading={setLoading}
              />
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBody;
