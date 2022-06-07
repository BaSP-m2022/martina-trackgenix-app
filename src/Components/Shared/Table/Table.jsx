import React from 'react';
import styles from './table.module.css';
import Row from '../Row/Row';

const Table = ({ title, data, headers, deleteItem, editItem }) => {
  //deberia estar children tamb
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <Row
            data={data}
            headers={headers}
            deleteItem={deleteItem}
            editItem={editItem}
            // children={children}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
