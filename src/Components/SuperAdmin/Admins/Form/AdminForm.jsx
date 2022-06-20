import React, { useState } from 'react';
import styles from 'Components/SuperAdmin/Admins/Form/adminForm.module.css';
import Input from 'Components/Shared/Field/Input';
import RadioButton from 'Components/Shared/Field/RadioButton';
import Button from 'Components/Shared/Buttons/Buttons';
import { useDispatch } from 'react-redux/es/exports';
import { addAdmin, editAdmin } from 'redux/admins/thunks';

const AdminForm = ({
  showForm,
  setShowForm,
  setShowModal,
  setChildrenModal,
  previousAdmin,
  setPreviousAdmin
}) => {
  if (!showForm) {
    return null;
  }

  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState(previousAdmin);

  const cleanFields = () => {
    setPreviousAdmin({
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      active: false
    });
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userInput._id) {
      const adminResponse = await dispatch(addAdmin(userInput));
      if (adminResponse.error) {
        setChildrenModal(adminResponse.message);
        setShowModal(true);
      } else {
        closeForm();
      }
    } else {
      const adminResponse = await dispatch(editAdmin(userInput));
      if (adminResponse.error) {
        setChildrenModal(adminResponse.message);
        setShowModal(true);
      } else {
        closeForm();
      }
    }
  };

  const closeForm = () => {
    cleanFields();
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Add new admin</h2>
        <div>
          <Input
            type="text"
            name="firstName"
            label={'First name'}
            value={userInput.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            label={'Last name'}
            value={userInput.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="text"
            name="phone"
            label={'Phone'}
            value={userInput.phone}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            label={'Email'}
            value={userInput.email}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            label={'Password'}
            value={userInput.password}
            onChange={onChange}
          />
        </div>
        <div>
          <RadioButton name="active" label={'Active'} value={[true, false]} onChange={onChange} />
        </div>
        <div className={styles.button}>
          <Button onClick={(e) => onSubmit(e)}>Submit</Button>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
