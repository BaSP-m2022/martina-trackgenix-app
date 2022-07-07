import React, { useState } from 'react';
import styles from './table.module.css';
import Row from '../Row/Row';
import Button from '../Buttons/Buttons';

const Table = ({ title, data, headersColumns, headers, deleteItem, editItem, viewEmployees }) => {
  const [indexPage, setIndexPage] = useState(1);
  const pageItems = data.slice(10 * (indexPage - 1), 10 * indexPage);
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
            {headersColumns.map((headersColumns, index) => {
              return <th key={index}>{headersColumns}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {pageItems.map((item, index) => {
            return (
              <Row
                key={index}
                data={item}
                headers={headers}
                deleteItem={() => deleteItem(item._id)}
                editItem={() => editItem(item)}
                viewEmployees={() => viewEmployees(item)}
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
