import React, { useState } from 'react';
import Modal from '../Modals/index';
import ModalError from '../Modals/error';
import styles from './form.module.css';

const EditTask = ({ show, closeForm, previewTask }) => {
    if (!show) {
      return null;
    }

    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);

    const [editTask, setEditTask] = useState({
        description: previewTask.description
    });

    const onChange = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setEditTask({
          description: ''
        });

        const taskId = previewTask._id;

        const options = {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                description: editTask.description
            })
          };

        const url = `${process.env.REACT_APP_API_URL}/super-admins/${taskId}`;

        fetch(url, options).then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              return response.json().then(({ message }) => {
                setEditTask(true);
                throw new Error(message);
              });
            }
            setShowModal(true);
            return response.json();
          });
    };

    const closeModal = () => {
        setShowModal(false);
        setShowModalError(false);
    };

    return (
        <div className={styles.container}>
            <Modal title={'task updated successfully'} show={showModal} closeModal={closeModal} />
            <ModalError title={'There was an error'} show={showModalError} closeModal={closeModal} />
            <form onSubmit={onSubmit}>
            <div>
                <h2>Task Description</h2>
                <input
                    type="text"
                    name="description"
                    placeholder="new-description"
                    value={editTask.description}
                    onChange={onChangeDescInput}
                />
            </div>
            <div>
                <input
                    type="submit"
                    value="create"
                    onSubmit={() => {
                      setShowModal(true);
                    }}
                />
            </div>
            </form>
            <div>
                <button onClick={closeForm}>Close</button>
            </div>
        </div>
    );
};

export default EditTask;

