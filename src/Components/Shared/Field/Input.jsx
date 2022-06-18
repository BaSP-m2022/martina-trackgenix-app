import React from 'react';
import styles from './input.module.css';

const Input = ({ type, name, label, register, valueOptions, error, htmlFor }) => {
  return (
    <>
      {type === 'select' ? (
        <div className={styles.container}>
          <label htmlFor={htmlFor}>{label}</label>
          <select name={name} {...register(name)}>
            {/* not sure if necessary:
            {!value ? <option>Select one</option> : <option>{value}</option>} */}
            {valueOptions.map((item) => (
              <option key={item._id} value={item._id}>
                {item._id} - {item.first_name || item.project_name || item.description}
              </option>
            ))}
          </select>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <div className={styles.container}>
          <label htmlFor={htmlFor}>{label}</label>
          <input
            type={type}
            label={label}
            name={name}
            {...register(name)}
            className={error ? styles.errorRed : ''}
          ></input>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </>
  );
};

export default Input;
