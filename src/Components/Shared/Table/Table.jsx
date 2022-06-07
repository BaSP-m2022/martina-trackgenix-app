import React from 'react';
import styles from './table.module.css';

const Table = ({ title, data, headers }) => {
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
          {data.map((row) => {
            return (
              <tr key={row._id}>
                {headers.map((header, index) => {
                  return <td key={index}>{row[header]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
