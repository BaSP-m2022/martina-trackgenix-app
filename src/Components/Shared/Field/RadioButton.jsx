import React from 'react';
import styles from './input.module.css';

const RadioButton = ({ type, name, label, value, onChange }) => {
  console.log(value);
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.radio}>
        <input type={type} name={name} value={value[0]} onChange={onChange}></input>
        <input type={type} name={name} value={value[1]} onChange={onChange}></input>
      </div>
    </div>
  );
};

export default RadioButton;
