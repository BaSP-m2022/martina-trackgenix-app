// import react from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';

const List = ({ list, deleteItem }) => {
  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="firstName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="phone">Phone</th>
            <th id="email">Email</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
