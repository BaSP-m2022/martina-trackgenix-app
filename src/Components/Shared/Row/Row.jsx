import React from 'react';
import styles from './row.module.css';
import Button from '../Buttons/Buttons';

const Row = ({ data, headers, deleteItem, editItem }) => {
  return (
    <tr className={styles.tr} key={data._id}>
      {headers.map((header, index) => {
        return <td key={index}>{data[header]}</td>;
      })}
      <td>
        <Button onClick={editItem}>&#9998;</Button>
      </td>
      <td>
        <Button onClick={deleteItem} width={'55px'}>
          X
        </Button>
      </td>
    </tr>
  );
};

export default Row;
