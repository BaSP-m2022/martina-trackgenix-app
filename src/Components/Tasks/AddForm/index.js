import { useState } from 'react';
import styles from './form.module.css';

function form() {
  const [userInput, setUserInput] = useState({
    description: ''
  });

  const onChangeDescInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      description: ''
    });

    const option = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: userInput.description
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/tasks`;

    fetch(url, option).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="new-description"
            value={userInput.description}
            onChange={onChangeDescInput}
          />
        </div>
        <div>
          <input type="submit" value="create" />
        </div>
      </form>
    </div>
  );
}

export default form;
