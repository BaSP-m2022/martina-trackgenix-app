import React from 'react';
import styles from './form.module.css';
import Button from '../../../Shared/Buttons/Buttons';
import Input from '../../../Shared/Field/Input';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../../../redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

const FormTasks = ({
  showForm,
  setShowForm,
  previewTask,
  setPreviewTask,
  setShowModal,
  setChildrenModal
}) => {
  if (!showForm) {
    return null;
  }
  const dispatch = useDispatch();

  const schema = joi.object({
    description: joi.string().required().min(10).max(60)
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      description: previewTask.description
    }
  });

  const onSubmit = async (data) => {
    if (!previewTask._id) {
      try {
        const taskResponse = await dispatch(addTask(data));
        if (taskResponse.error) {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const taskResponse = await dispatch(editTask(data, previewTask._id));
        if (taskResponse.error) {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
        } else {
          setChildrenModal(taskResponse.message);
          setShowModal(true);
          closeForm();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const closeForm = () => {
    setPreviewTask({
      _id: '',
      description: ''
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Task Description</h2>
          <Input
            type={'text'}
            label={'Description: '}
            name={'description'}
            register={register}
            error={errors.description?.message}
          />
        </div>
        <div>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
        <div>
          <Button onClick={() => reset()}>Reset Form</Button>
        </div>
        <div>
          <Button onClick={closeForm}>Close</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTasks;
