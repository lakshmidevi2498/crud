
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const[id,setId]= useState('');
  const url = "http://localhost:3000/employee";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get(url)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  };

  const saveData = () => {
    if (!name || !email || !role) {
      alert('Please enter all fields');
      return;
    }

    const newEmployee = {
      name: name,
      email: email,
      role: role,
    };

    axios.post(url, newEmployee)
      .then(response => {
        console.log('Employee added successfully:', response.data);
        fetchEmployees();
        setName('');
        setEmail('');
        setRole('');
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error adding new employee:', error);
      });
  };
  //    // delete data
   const deleteData = (employeeId) => {
    axios.delete(`${url}/${employeeId}`)
      .then(response => {
        console.log('Employee deleted successfully:', response.data);
        fetchEmployees();
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };


   // update data
   const updateData = (employeeId) => {
    setShowForm(!showForm)
    const employeeToUpdate = employees.find(emp => emp.id === employeeId);

    setName(employeeToUpdate.name);
    setEmail(employeeToUpdate.email);
    setRole(employeeToUpdate.role);
    setShowForm(true);
    setId(employeeToUpdate.id)
  };

  const saveChanges = () => {
    if (!name || !email || !role) {
      alert('Please enter all fields');
      return;
    }
    const updatedEmployee = {
      name: name,
      email: email,
      role: role,
      id:id
    };
    console.log('Updated Employee:', id);
    axios.put(url+"/"+id, updatedEmployee)
      .then(response => {
        console.log('Employee updated successfully:', response.data);
        fetchEmployees();
        setName('');
        setEmail('');
        setRole('');
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  const cancel = () => {
    setName('');
    setEmail('');
    setRole('');
    setShowAddForm(false);
    setShowForm(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    
  };

  return (
    <div className="container">
      <div className="header d-flex justify-content-between p-3 bg-primary" id="head">
        <h3 className="text-light ">Manage Employee Details</h3>
        <button className="btn btn-light fw-bold" onClick={toggleAddForm}>
          Add Employee+
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <button className="btn text-primary fw-bold" onClick={() => updateData(employee.id)}><i className="fas fa-pencil-alt"></i></button>
                <button className="btn text-danger fw-bold" onClick={() => deleteData(employee.id)}> <i className="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title text-warning">Add Employee Details</h5>
                <button type="button" className="close btn fs-4 fw-4" onClick={toggleAddForm}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="name ">Name</label>
                    <input type="text" className="form-control " id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group  mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group  mb-3">
                    <label htmlFor="role">Role</label>
                    <input type="text" className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                  </div>
                </form>
              </div>
              <div className="d-flex justify-content-around mb-3">
                <button type="button" className="btn btn-danger" onClick={cancel}>Close</button>
                <button type="button" className="btn btn-primary" onClick={saveData}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title text-warning">Edit Employee Details</h5>
                <button type="button" className="close btn fs-4 fw-4" close="modal" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="name ">Name</label>
                    <input type="text" className="form-control " id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="form-group  mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group  mb-3">
                    <label htmlFor="role">Role</label>
                    <input type="text" className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                  </div>
                </form>
              </div>
              <div className="d-flex justify-content-around mb-3">
                <button type="button" className="btn btn-danger" onClick={cancel}>Close</button>
                <button type="button" className="btn btn-primary" onClick={saveChanges}>Savechanges</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
