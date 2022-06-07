import React, { useState } from 'react';
import styles from './addSAdmin.module.css';
import Input from '../../Shared/Field/Input';
import Button from '../../Shared/Buttons/Buttons';

const AddSuperAdmin = ({ show, closeForm, setShowModal, setShowTitle, addItem, setLoading }) => {
  if (!show) {
    return null;
  }

  // const [userInput, setUserInput] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   active: ''
  // });

  // const onChange = (e) => {
  //   setUserInput({ ...userInput, [e.target.name]: e.target.value });
  // };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        active: active
      })
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        setShowModal(true);
        setShowTitle(data.message);
        setLoading(false);
      } else {
        addItem(data.data);
        setShowTitle('Super Admin Created');
        setShowModal(true);
        closeForm();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add SuperAdmin</h2>
        <Input
          type={'text'}
          name={'firstName'}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label={'Name'}
        />
        <Input
          type={'text'}
          name={'lastName'}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label={'Last Name'}
        />
        <Input
          type={'text'}
          name={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label={'Email'}
        />
        <Input
          type={'password'}
          name={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label={'Password'}
        />
        <Input
          type={'select'}
          name={'active'}
          value={active}
          onChange={(e) => setActive(e.target.value)}
          valueOptions={[true, false]}
          label={'Active'}
        />
        <div>
          <input
            type="submit"
            value="Confirm"
            onSubmit={() => {
              setShowModal(true);
            }}
          ></input>
        </div>
        <div>
          <Button onClick={closeForm}> Close </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSuperAdmin;
