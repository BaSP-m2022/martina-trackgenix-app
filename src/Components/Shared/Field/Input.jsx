import React from 'react';
import styles from './input.module.css';

const Input = ({ type, name, value, onChange, valueOptions, label }) => {
  return (
    <>
      {type === 'select' ? (
        <div className={styles.container}>
          <label>{label}</label>
          <select name={name} onChange={onChange}>
            <option>Select One</option>
            {valueOptions.map((item) => (
              <option key={item._id} value={value}>
                {item._id}
                {/* -{item.first_name || item.project_name || item.description} */}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.container}>
          <label>{label}</label>
          <input type={type} name={name} value={value} onChange={onChange}></input>
        </div>
      )}
    </>
  );
};

export default Input;
