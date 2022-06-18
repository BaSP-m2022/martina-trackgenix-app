import React from 'react';
import styles from './input.module.css';

const RadioButton = ({ name, label, valueOptions, register, error }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.radio}>
        <label htmlFor={name}>{valueOptions[0].toString()}</label>
        <input type="radio" name={name} value={valueOptions[0]} {...register(name)} />
        <label htmlFor={name}>{valueOptions[1].toString()}</label>
        <input type="radio" name={name} value={valueOptions[1]} {...register(name)} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default RadioButton;
