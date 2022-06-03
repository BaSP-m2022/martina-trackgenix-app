import { useState } from 'react';
import styles from './form.module.css';

const Add = ({ show, closeForm, setShowModal, setShowTitle, addItem }) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    description: ''
  });

  const onChangeDescInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUserInput({
      description: ''
    });

    const option = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: userInput.description
      })
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, option);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.message);
      }
      addItem(data.data);
      setShowTitle('Task Created');
      setShowModal(true);
      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Task Description</h2>
          <input
            type="text"
            name="description"
            placeholder="new-description"
            value={userInput.description}
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
        <div>
          <button onClick={closeForm}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
