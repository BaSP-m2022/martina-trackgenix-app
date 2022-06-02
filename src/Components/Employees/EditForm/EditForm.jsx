import React, { useState } from 'react';
import styles from './EditForm.module.css';

const EditEmployee = ({
  show,
  closeForm,
  previewEmployee,
  setShowModal,
  setShowTitle,
  editEmployee
}) => {
  if (!show) {
    return null;
  }

  const [userInput, setUserInput] = useState({
    _id: previewEmployee._id,
    first_name: previewEmployee.first_name,
    last_name: previewEmployee.last_name,
    phone: previewEmployee.phone,
    email: previewEmployee.email,
    password: previewEmployee.password,
    active: previewEmployee.active
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const EmployeeId = previewEmployee._id;

    const putEmployee = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        first_name: userInput.first_name,
        last_name: userInput.last_name,
        phone: userInput.phone,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active
      })
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${EmployeeId}`,
        putEmployee
      );
      const res = await response.json();
      if (!response.ok) {
        setShowModal(true);
        setShowTitle(`${res.msg} cannot create employee`);
      } else {
        console.log('HOLIS;', userInput);
        closeForm(true);
        editEmployee(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Edit employee</h2>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="first_name"
            value={userInput.first_name}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            name="last_name"
            value={userInput.last_name}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="number" name="phone" value={userInput.phone} onChange={onChange}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={userInput.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Status</label>
          <select name="active" value={userInput.active} onChange={onChange}>
            <option value="">Select status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className={styles.submitButton}>
          <input type="submit" value="Confirm changes"></input>
        </div>
        <button onClick={closeForm}>x</button>
      </form>
    </div>
  );
};

export default EditEmployee;
