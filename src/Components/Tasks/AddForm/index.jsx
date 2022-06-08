import { useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';

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
          <Input
            type={'text'}
            label={'Description'}
            name={'description'}
            placeholder={'new-description'}
            value={userInput.description}
            onChange={onChangeDescInput}
          ></Input>
        </div>
        <div>
          <Button
            width={'80px'}
            height={'30px'}
            onSubmit={() => {
              setShowModal(true);
            }}
          >
            Create
          </Button>
        </div>
        <div>
          <Button onClick={closeForm} width={'80px'} height={'30px'}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Add;
