import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { 
  Card,
  Nav,
  Button,
  Form,
  Col
} from 'react-bootstrap';

import AuthContext from '../../context/auth/authContext';

const LOGIN = 0;
const SIGNUP = 1;

const Login = () => {
    const authContext = useContext(AuthContext);

    const [ activeForm, setActiveForm ] = useState(LOGIN);

    const { login, signup, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
        firstName: '',
        lastName: ''
    });

    const { email, password, username, firstName, lastName } = user;

    const onChange = e => setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            console.log('Please fill in all fields');
        } else {
            if (activeForm === LOGIN) {
              login({ email, password });
            } else {
              signup({...user});
            }
            
        }
    }

    const subtitle = activeForm === LOGIN ? "Login to existing account" : "Create new account";
    const btnText = activeForm === LOGIN ? "Login" : "Sign up";

    const loginForm = <Form onSubmit={onSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={onChange} 
          name="email" 
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={onChange} 
          name="password" 
          required />
      </Form.Group>
      <Button type="submit" variant="primary">{btnText}</Button>
    </Form>

    const signupForm = <Form onSubmit={onSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={onChange}
          name="email"
          required
        />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Create new username"
          value={username}
          onChange={onChange}
          name="username"
          required
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} xs="6" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={onChange}
            name="firstName"
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={onChange}
            name="lastName"
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          name="password"
          required />
      </Form.Group>
      <Button type="submit" variant="primary">{btnText}</Button>
    </Form>

    if (!isAuthenticated) {
        return (<>
          <Card style={{width: '50%', left: '25%', padding: 0}}>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link active={activeForm === LOGIN} 
                    onClick={() => setActiveForm(LOGIN)}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link active={activeForm === SIGNUP}
                    onClick={() => setActiveForm(SIGNUP)}>Sign up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Welcome to PodSquad</Card.Title>
              <Card.Subtitle>{subtitle}</Card.Subtitle>
              <br />
              {activeForm === LOGIN ? loginForm : signupForm}
            </Card.Body>
          </Card>


            {/* <div className='card w-50' style={{ left: '25%' }}>
              <h2>Welcome to PodSquad</h2>
              <form onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='login-label'
                  >
                    Email:
                </label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                    style={{ width: '40rem' }}
                  />
                </div>
                <div style={{ paddingBottom: '1rem' }}>
                  <label
                    htmlFor='password'
                    className='login-label'
                  >
                    Password:{' '}
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                    style={{ width: '40rem' }}
                  />
                </div>
                <div>
                  
                  <a href='#'>
                    <input
                      type='submit'
                      value='Login'
                      className='btn btn-primary btn-block'
                      style={{ width: '30rem' }}
                      onSubmit={onSubmit}
                    />
                  </a>
                </div>
              </form>
            </div> */}
            </>
        );
      } else {
        return <Redirect to='/' />;
      }
}

export default Login;