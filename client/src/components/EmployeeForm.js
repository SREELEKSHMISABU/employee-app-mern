import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import API from '../utils/api';

const EmployeeForm = ({ show, handleClose, employeeToEdit, refreshList }) => {
  const [employee, setEmployee] = useState({ name: '', position: '', department: '', salary: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    } else {
      setEmployee({ name: '', position: '', department: '', salary: '' });
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validate = () => {
    if (!employee.name.trim()) return 'Name is required';
    if (employee.salary && isNaN(employee.salary)) return 'Salary must be a number';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (employeeToEdit) {
        await API.put(`/employees/${employeeToEdit._id}`, employee);
      } else {
        await API.post('/employees', employee);
      }
      refreshList();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{employeeToEdit ? 'Update Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter position"
              name="position"
              value={employee.position}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={employee.department}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit">{employeeToEdit ? 'Update' : 'Create'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;