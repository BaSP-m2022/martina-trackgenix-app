import React, { useState } from 'react';
import styles from './table.module.css';
import Row from '../Row/Row';
import Button from '../Buttons/Buttons';

const Table = ({ title, data, headers, deleteItem, editItem }) => {
  const [indexPage, setIndexPage] = useState(1);
  const show = data.slice(10 * (indexPage - 1), 10 * indexPage);
  const nextPage = () => {
    if (data.length / 10 >= indexPage) {
      setIndexPage(indexPage + 1);
    }
  };
  const previousPage = () => {
    if (indexPage > 1) {
      setIndexPage(indexPage - 1);
    }
  };

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
          {show.map((index) => {
            return (
              <Row
                key={index}
                data={data}
                headers={headers}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles.page}>
        <p> Page {indexPage} </p>
      </div>
      <div className={styles.buttons}>
        <div>
          <Button
            width={'100px'}
            height={'40px'}
            fontSize={'15px'}
            margin={'2px'}
            disabled={indexPage <= 1}
            onClick={() => previousPage()}
          >
            Previous
          </Button>
        </div>
        <div>
          <Button
            width={'100px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage >= data.length / 10}
            onClick={() => nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Table;
