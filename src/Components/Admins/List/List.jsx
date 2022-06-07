import React, { useState } from 'react';
import styles from './list.module.css';
import Row from '../../Shared/Row/Row';
import EditItem from '../EditItem/EditItem';
import Button from '../../Shared/Buttons/Buttons';
import Modal from '../../Shared/Modal/Modal';

const List = ({ list, deleteItem, editItem, setShowModal, setChildrenModal }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const handleDelete = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setChildrenModal('Admin deleted successfully');
      setModalConfirm(false);
      deleteItem(_id);
    } catch (error) {
      setShowModal(true);
      setChildrenModal(error.msg);
      setModalConfirm(false);
      console.error(error);
    }
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
                deleteItem={() => setModalConfirm(true)}
                editItem={() => setShowFormEdit(true)}
              >
                <EditItem
                  showFormEdit={showFormEdit}
                  setShowFormEdit={setShowFormEdit}
                  setShowModal={setShowModal}
                  setChildrenModal={setChildrenModal}
                  previewAdmin={item}
                  editItem={editItem}
                />
                <Modal isOpen={modalConfirm} handleClose={() => setModalConfirm(false)}>
                  Confirm DELETE Admin?
                  <div>
                    <Button onClick={() => handleDelete(item._id)}>CONFIRM</Button>
                  </div>
                  <div>
                    <Button onClick={() => setModalConfirm(false)}>Close</Button>
                  </div>
                </Modal>
              </Row>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
