import { useState } from 'react';
import './style.css';

function Form() {
  // Here we set two state variables for firstName and lastName using `useState`
  const [firstName, setFirstName] = useState('1GNES16S836152891');

  const handleInputChange = (event: any) => {
    // Getting the value and name of the input which triggered the change
    const { value } = event.target;
    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    return setFirstName(value);
  };

  const handleFormSubmit = (event: any) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    // Alert the user their first and last name, clear the inputs
    alert(`Hello ${firstName}`);
    setFirstName('');
  };

  return (
    <div>
      <p>
          {`Hello please enter a vin example: ${firstName}`}
      </p>
      <form className="form">
        <input
          value={firstName}
          name="lastName"
          onChange={handleInputChange}
          type="text"
          placeholder="Last Name"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
