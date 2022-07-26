import React from 'react';
import styles from './input.module.css';

const Input = ({ type, name, label, register, valueOptions, error, disabled }) => {
  return (
    <>
      {type === 'select' ? (
        <div className={styles.container}>
          <label htmlFor={name}>{label}</label>
          <select
            name={name}
            {...register(name)}
            className={error ? styles.errorRed : styles.input}
            disabled={disabled && disabled}
          >
            {valueOptions.map((item) => (
              <option key={item._id} value={item._id}>
                {item.first_name
                  ? item.first_name + ' ' + item.last_name
                  : item.project_name || item.description}
              </option>
            ))}
          </select>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <div className={styles.container}>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            label={label}
            name={name}
            {...register(name)}
            className={error ? styles.errorRed : styles.input}
            disabled={disabled && disabled}
          ></input>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </>
  );
};

export default Input;
