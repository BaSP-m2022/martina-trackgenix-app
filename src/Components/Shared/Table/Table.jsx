import React from 'react';
import styles from './table.module.css';
import Row from '../Row/Row';

const Table = ({ title, data, headers, deleteItem, editItem }) => {
  //chieldren should be here too
  
  //Esto seria para que no se muestren demasiados datos en una pag
    {// const [indexPage, setIndexPage] = useState(1);
  //const show = data.slice(10 * (indexPage - 1), 10 * indexPage);
  //const nextPage = () => {
  //  if (data.length / 10 >= indexPage) {
  //    setIndexPage(indexPage + 1);
  //  }
  //};
  //const previousPage = () => {
  //  if (indexPage > 1) {
  //    setIndexPage(indexPage - 1);
  //};}
  }
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
         {//{show.map((row) => {   
          <Row
            data={data}
            headers={headers}
            deleteItem={deleteItem}
            editItem={editItem}
            // children={children}
          />
        </tbody>
      </table>
      {// <div>
       // <div>
       //   <p>Page {indexPage}</p>
       // </div>
       // <div>
        //  <Button
        //    disabled={indexPage <= 1}
        //    onClick={() => previousPage()}
        //  >
        //    Previous
        //  </Button>
        //</div>
        //<div>
        //  <Button
        //    disabled={indexPage >= data.length / 10}
        //    onClick={() => nextPage()}
        //  >
        //    Next
        //  </Button>
      //  </div>
      //</div> }
    </div>
  );
};

export default Table;
