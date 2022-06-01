import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';

const List = ({ list, setShowModal, setTitleModal, deleteItem }) => {
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
            <th id="active">Active</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <ListItem
                key={item._id}
                listItem={item}
                setShowModal={setShowModal}
                setTitleModal={setTitleModal}
                deleteItem={deleteItem}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
