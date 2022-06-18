import React from 'react';
import styles from './superAdminForm.module.css';
import Button from '../../../Shared/Buttons/Buttons';
import Input from '../../../Shared/Field/Input';
import RadioButton from '../../../Shared/Field/RadioButton';
//import { useDispatch } from 'react-redux';
//import { addSuperAdmin, editSuperAdmin } from '../../../../redux/superAdmins/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const SuperAdminForm = ({
  showForm,
  setShowForm,
  //previousSuperAdmin,
  setPreviousSuperAdmin
  //setShowModal,
  //setChildrenModal
}) => {
  if (!showForm) {
    return null;
  }

  //const dispatch = useDispatch();

  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(20)
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  //const [inputSuperAdmin, setInputSuperAdmin] = useState(previousSuperAdmin);

  const cleanFields = () => {
    setPreviousSuperAdmin({
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });
  };

  // const onChange = (e) => {
  //   setInputSuperAdmin({ ...inputSuperAdmin, [e.target.name]: e.target.value });
  // };

  const onClose = () => {
    setShowForm(false);
    cleanFields();
  };

  const onSubmit = async (e) => {
    console.log(e);
    // e.preventDefault();
    // if (!inputSuperAdmin._id) {
    //   const superAdminResponse = await dispatch(addSuperAdmin(inputSuperAdmin));
    //   if (superAdminResponse.error) {
    //     setChildrenModal(superAdminResponse.message);
    //     setShowModal(true);
    //   } else {
    //     onClose();
    //     setChildrenModal('Super Admin added');
    //     setShowModal(true);
    //   }
    // } else {
    //   const superAdminResponse = await dispatch(editSuperAdmin(inputSuperAdmin));
    //   if (superAdminResponse.error) {
    //     setChildrenModal(superAdminResponse.message);
    //     setShowModal(true);
    //   } else {
    //     onClose();
    //     setChildrenModal('Super Admin edited');
    //     setShowModal(true);
    //   }
    // }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Form Edit</h2>
        <Input
          type={'text'}
          name={'firstName'}
          label={'First name'}
          htmlFor={'firstName'}
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          type={'text'}
          name={'lastName'}
          label={'Last name'}
          htmlFor={'lastName'}
          register={register}
          error={errors.lastName?.message}
        />
        <Input
          type={'text'}
          name={'email'}
          label={'Email'}
          htmlFor={'email'}
          register={register}
          error={errors.email?.message}
        />
        <Input
          type={'password'}
          name={'password'}
          label={'Password'}
          htmlFor={'password'}
          register={register}
          error={errors.password?.message}
        />
        <RadioButton
          name={'active'}
          label={'Active'}
          valueOptions={[true, false]}
          register={register}
        />
        <Button onClick={(e) => onSubmit(e)}>Confirm</Button>
        <div>
          <Button onClick={onClose}> Close </Button>
        </div>
      </form>
    </div>
  );
};
export default SuperAdminForm;
