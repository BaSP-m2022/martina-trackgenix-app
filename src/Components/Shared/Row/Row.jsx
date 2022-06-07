import React from 'react';
import styles from './row.module.css';

const Row = ({ data, headers, deleteItem, editItem, children }) => {
  return (
    <tr className={styles.tr} key={data._id}>
      {headers.map((header, index) => {
        return <td key={index}>{data[header]}</td>;
      })}
      <td>
        <button onClick={editItem}>&#9998;</button>
      </td>
      <td>
        {children}
        <button onClick={deleteItem}>X</button>
      </td>
    </tr>
  );
};

export default Row;
