import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import PrivateRoute from './components/PrivateRoute';
import { removeToken } from './utils/auth';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function App() {
  const [role, setRole] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false); // trigger refresh

  // On mount, validate token & role from localStorage
  useEffect(() => {
    // decode token role from localStorage if exists
    const token = localStorage.getItem('token');
    if (token) {
      // decode role from JWT (base64 decode)
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(window.atob(base64Payload));
      setRole(payload.role);
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setRole(null);
  };

  const openForm = (employee = null) => {
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  const closeForm = () => {
    setEmployeeToEdit(null);
    setShowForm(false);
  };

  // Refresh employee list after changes
  const refreshList = () => {
    setRefreshToggle(!refreshToggle);
  };

  if (!role) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <>
        <Navbar bg="dark" variant="dark" className="mb-3">
          <Container>
            <Navbar.Brand href="/">Employee Portal</Navbar.Brand>
            <Nav className="me-auto"></Nav>
            <Navbar.Text className="me-3">Role: {role.toUpperCase()}</Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <EmployeeList role={role} onEdit={openForm} key={refreshToggle} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {role === 'admin' && (
            <EmployeeForm
              show={showForm}
              handleClose={closeForm}
              employeeToEdit={employeeToEdit}
              refreshList={refreshList}
            />
          )}
        </Container>
      </>
    </BrowserRouter>
  );
}

export default App;
