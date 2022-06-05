import React from 'react';
import styles from './input.module.css';

const Input = ({ children, type, name, value, onChange, identification, valueOptions }) => {
  if (identification === 'input') {
    return (
      <div className={styles.container}>
        {children}
        <input type={type} name={name} value={value} onChange={onChange}></input>
      </div>
    );
  }
  if (identification === 'select') {
    return (
      <div className={styles.container}>
        <select name={name} onChange={onChange}>
          {valueOptions.map((item) => (
            <option key={item._id} value={value}>
              {item._id}
            </option>
          ))}
        </select>
      </div>
    );
  }
};

export default Input;
