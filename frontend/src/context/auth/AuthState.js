import React, { useReducer } from 'react';
import axios from 'axios';

import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import {

} from '../types';

const AuthState = props => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        username: null,
        current: null,
        loading: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Log user in
    const login = async formData => {
        const config = {
        headers: {
            'Content-Type': 'application/json'
        }
        };

        try {
        const res = await axios.post('/api/auth', formData, config);
        // dispatch({
        //     type: LOGIN_USER,
        //     payload: res.data
        // });
        console.log(res.data);

        loadUser();
        } catch (error) {
            // dispatch({ type: LOGIN_FAILED });
            console.log("Request failed");
        }
    };

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            // dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            // dispatch({ type: AUTH_ERROR });
        }
    };

    return (
        <AuthContext.Provider
         value={{
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            username: state.username,
            current: state.current,
            loading: state.loading,
            loadUser,
            login
         }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;