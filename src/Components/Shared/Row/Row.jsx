import React from 'react';
import styles from './row.module.css';
import Button from '../Buttons/Buttons';

const Row = ({ data, headers, deleteItem, editItem, viewEmployees }) => {
  return (
    <tr className={styles.tr} key={data._id} onClick={viewEmployees}>
      {headers.map((header, index) => {
        return <td key={index}>{data[header]}</td>;
      })}
      <td>
        <Button onClick={editItem} width={'55px'}>
          &#9998;
        </Button>
      </td>
      <td>
        <Button onClick={deleteItem} width={'55px'}>
          X
        </Button>
      </td>
      <td>
        <Button onClick={viewEmployees} width={'55px'}>
          More
        </Button>
      </td>
    </tr>
  );
};

export default Row;
