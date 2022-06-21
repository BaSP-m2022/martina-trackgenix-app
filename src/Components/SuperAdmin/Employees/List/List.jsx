import React from 'react';
import styles from 'Components/SuperAdmin/Employees/List/List.module.css';
import Row from 'Components/Shared/Row/Row';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { deleteEmployee } from 'redux/employees/thunks';

const List = ({ setShowForm, setPreviewsEmployee }) => {
  const employees = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    if (confirm('Are you sure you want to remove the Employee?')) {
      dispatch(deleteEmployee(_id));
    }
  };

  const handleEdit = (employee) => {
    setPreviewsEmployee(employee);
    setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="first_name">First Name</th>
            <th id="last_name">Last Name</th>
            <th id="phone">Phone</th>
            <th id="email">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={['_id', 'first_name', 'last_name', 'phone', 'email']}
                deleteItem={() => handleDelete(item._id)}
                editItem={() => handleEdit(item)}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default List;
