import {useState} from 'react';
import './style.css';
import axios from "axios";

function Form() {
  const [vinNumber, setVinNumber] = useState('');
  const [generatedVin, setGeneratedVin] = useState('1GNES16S836152891');
  const [vehicle, setVehicleValues] = useState({
      make: '',
      vin: '',
      year: '',
      model: ''
  });

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    return setVinNumber(value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
      axios.get(`http://localhost:4000/v1/vehicles/${vinNumber}`, {
          headers: {
              "Content-Type" : "application/json",
              "Authorization" : "Basic YWJjOjEyMw=="
          }
      })
          .then(res => {
              const vehicle = res.data.vehicle;
              setVehicleValues(vehicle);
          })
  };
  const handleVinGenerator = (event: any) => {
    event.preventDefault();
      axios.get(`https://randomvin.com/getvin.php?type=real`, {
          headers: {"Access-Control-Allow-Origin": "*"}
      })
          .then(res => {
              setGeneratedVin(res.data)
          })
  };

  return (
      <>
          <div className="container">
              <button type="button" className='custom-btn btn-1' onClick={handleVinGenerator}>
                  Generate VIN
              </button>
              <h1>{`Your Generated Vin is: ${generatedVin}`}</h1>
          <div>
              <p>
                  {`Hello please enter a vin`}
              </p>
              <form className="form">
                  <input
                      value={vinNumber}
                      name="vinNumber"
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Vin Number"/>
                  <button type="button" className='custom-btn btn-1' onClick={handleFormSubmit}>
                      Submit
                  </button>
              </form>
          </div>
              <table className="flat-table flat-table-1">
                  <thead>
                  <tr>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Vin</th>
                      <th>Year</th>
                  </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{`${vehicle.make}`}</td>
                          <td>{`${vehicle.model}`}</td>
                          <td>{`${vehicle.vin}`}</td>
                          <td>{`${vehicle.year}`}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </>
  );
}

export default Form;
