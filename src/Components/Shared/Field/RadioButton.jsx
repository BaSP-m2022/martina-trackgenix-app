import React from 'react';
import styles from './input.module.css';

const RadioButton = ({ name, label, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.radio}>
        <label>
          {value[0].toString()}
          <input type="radio" name={name} value={value[0]} onChange={onChange}></input>
        </label>
        <label>
          {value[1].toString()}
          <input type="radio" name={name} value={value[1]} onChange={onChange}></input>
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
