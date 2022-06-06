import React from 'react';
import styles from './input.module.css';

const RadioButton = ({ name, label, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.radio}>
        <input type="radio" name={name} value={value[0]} onChange={onChange}></input>
        <input type="radio" name={name} value={value[1]} onChange={onChange}></input>
      </div>
    </div>
  );
};

export default RadioButton;
