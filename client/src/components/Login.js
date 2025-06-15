import React, { useState } from 'react';
import API from '../utils/api';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = ({ setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter all fields');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      setRole(res.data.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container style={{ maxWidth: 400, marginTop: '3rem' }}>
      <h3>Employee Portal Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email" placeholder="Enter email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            isInvalid={error && !email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            isInvalid={error && !password}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;