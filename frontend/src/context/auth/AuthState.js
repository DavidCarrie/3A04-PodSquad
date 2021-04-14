import React, { useReducer } from 'react';
import axios from 'axios';
import ls from 'local-storage';

import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import {
	LOGIN_USER,
	LOGIN_FAILED,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT
} from '../types';

const LS_KEY = 'podsquad-userinfo';

const AuthState = props => {
	const initialState = {
		isAuthenticated: false,
		user: null,
		username: null,
		current: null,
		loading: true
	};

	const [state, dispatch] = useReducer(authReducer, ls.get(LS_KEY) || initialState);

	// Log user in
	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			// const res = await axios.post('/api/auth', formData, config);
			// console.log(res.data);

			dispatch({
				type: LOGIN_USER,
				payload: {
						// FAKE DATA
						userId: 32,
						username: formData.username || 'podcastLover101',
						firstName: formData.firstName || 'Jon',
						lastName: formData.lastName || 'Snow',
						email: formData.email
				}});

			if (localStorage.token) {
				setAuthToken(localStorage.token);
			}

			ls.set(LS_KEY, { ...formData, userId: 32, isAuthenticated: true });
		} catch (error) {
			dispatch({ type: LOGIN_FAILED, payload: { reason: 'Invalid user or password.' } });
			console.log("Request failed");
		}
	};

	const signup = async formData => {
		// send backend request to create a new account
		login(formData);
	}

	const logout = async () => {
		dispatch({ type: LOGOUT });
		ls.set(LS_KEY, {...initialState, isAuthenticated: false });
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				username: state.username,
				current: state.current,
				loading: state.loading,
				login,
				logout,
				signup
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;