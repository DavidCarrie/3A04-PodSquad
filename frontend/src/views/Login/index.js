import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const authContext = useContext(AuthContext);

    const { login, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            console.log('Please fill in all fields');
        } else {
            login({
                email,
                password
            });
        }
    }

    if (!isAuthenticated) {
        return (
          <div className='card w-50' style={{ left: '25%' }}>
            <h2>Welcome back to</h2>
            <h1 className='mac-header'>PodSquad</h1>
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
                {/* eslint-disable-next-line */}
                <a href='#'>
                  <input
                    type='submit'
                    value='Login'
                    className='btn btn-primary btn-block'
                    style={{ width: '30rem' }}
                  />
                </a>
              </div>
            </form>
          </div>
        );
      } else {
        return <Redirect to='/' />;
      }
}

export default Login;