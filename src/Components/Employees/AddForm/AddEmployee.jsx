import React, { useState } from 'react';
import styles from './AddEmployee.module.css';
import Button from '../../Shared/Buttons/Buttons';
import Input from '../../Shared/Field/Input';
import RadioButton from '../../Shared/Field/RadioButton';

const AddEmployee = ({ show, closeForm, setShowModal, setShowTitle, newEmployee, setLoading }) => {
  if (!show) {
    return null;
  }

  // const [userInput, setUserInput] = useState({
  //   first_name: '',
  //   last_name: '',
  //   phone: '',
  //   email: '',
  //   password: '',
  //   active: ''
  // });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState('');

  // const onChange = (e) => {
  //   setUserInput({ ...userInput, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const postEmployee = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        password: password,
        active: active
      })
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, postEmployee);
      const res = await response.json();
      if (!response.ok) {
        setShowModal(true);
        setShowTitle(`${res.msg} cannot create employee`);
        setLoading(false);
      } else {
        setShowModal(true);
        setShowTitle(res.message);
        newEmployee(res.data);
        closeForm(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new Employee</h2>
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
          name={'phone'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label={'Phone'}
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
        <RadioButton
          name={'active'}
          label={'Active'}
          value={['true', 'false']}
          onChange={(e) => setActive(e.target.value)}
        />
        <div className={styles.submitButton}>
          <input type="submit" value="Submit"></input>
        </div>
        <Button onClick={closeForm}>x</Button>
      </form>
    </div>
  );
};

export default AddEmployee;
