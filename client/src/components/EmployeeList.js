import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import EmployeeItem from './EmployeeItem';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

const EmployeeList = ({ role, onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Failed to load employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    try {
      await API.delete(`/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;

  return (
    <Container style={{ marginTop: "2rem" }}>
      <h3>Employee List</h3>
      {role === 'admin' && (
        <Button className="mb-3" onClick={() => onEdit(null)}>Add Employee</Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            {role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <EmployeeItem
              key={emp._id}
              employee={emp}
              role={role}
              onDelete={() => handleDelete(emp._id)}
              onEdit={() => onEdit(emp)}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;