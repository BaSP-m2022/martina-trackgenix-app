import React from 'react';
import styles from './input.module.css';
import { useForm } from 'react-hook-form';

const Input = ({ type, name, value, onChange, label, valueOptions, error, htmlFor }) => {
  const { register } = useForm();
  return (
    <>
      {type === 'select' ? (
        <div className={styles.container}>
          <label>{label}</label>
          <select name={name} onChange={onChange} value={value}>
            {!value ? <option>Select one</option> : <option>{value}</option>}
            {valueOptions.map((item) => (
              <option key={item._id} value={item._id}>
                {item._id} - {item.first_name || item.project_name || item.description}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.container}>
          <label htmlFor={htmlFor}>{label}</label>
          <input
            type={type}
            value={value}
            name={name}
            {...register(name, { minLength: 3 })} // validation test not working
            onChange={onChange}
            className={error ? styles.errorRed : ''}
          ></input>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </>
  );
};

export default Input;
