import React from 'react';
import { Button } from 'react-bootstrap';

const EmployeeItem = ({ employee, role, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.position}</td>
      <td>{employee.department}</td>
      <td>{employee.salary}</td>
      {role === 'admin' && (
        <td>
          <Button variant="warning" size="sm" className="me-2" onClick={onEdit}>Update</Button>
          <Button variant="danger" size="sm" onClick={onDelete}>Delete</Button>
        </td>
      )}
    </tr>
  );
};

export default EmployeeItem;