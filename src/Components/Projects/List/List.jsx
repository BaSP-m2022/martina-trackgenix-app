import React from 'react';
// import ListItem from '../ListItem/ListItem';
import Row from '../../Shared/Row/Row';
import styles from './list.module.css';

const List = ({ list, deleteItem, editItem }) => {
  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="project_name">Project Name</th>
            <th id="client">Client</th>
            <th id="start_date">Start Date</th>
            <th id="finish_date">Finish Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={['_id', 'project_name', 'client', 'start_date', 'finish_date', 'active']}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
