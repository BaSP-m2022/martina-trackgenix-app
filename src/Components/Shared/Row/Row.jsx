import React from 'react';
import styles from './row.module.css';
import Button from '../Buttons/Buttons';

const Row = ({ data, headers, deleteItem, editItem, activateItem, viewMore, inactive }) => {
  return (
    <>
      {inactive ? (
        <tr className={styles.inactive} key={data._id}>
          {headers.map((header, index) => {
            return (
              <td key={index} onClick={viewMore}>
                {data[header]}
              </td>
            );
          })}
          {editItem && (
            <td>
              <Button onClick={editItem} width={'55px'}>
                &#9998;
              </Button>
            </td>
          )}
          {activateItem && (
            <td>
              <Button onClick={activateItem} width={'55px'}>
                &#10004;
              </Button>
            </td>
          )}
        </tr>
      ) : (
        <tr className={styles.tr} key={data._id}>
          {headers.map((header, index) => {
            return (
              <td key={index} onClick={viewMore}>
                {data[header]}
              </td>
            );
          })}
          {editItem && (
            <td>
              <Button onClick={editItem} width={'55px'}>
                &#9998;
              </Button>
            </td>
          )}
          {deleteItem && (
            <td>
              <Button onClick={deleteItem} width={'55px'}>
                X
              </Button>
            </td>
          )}
        </tr>
      )}
    </>
  );
};

export default Row;
