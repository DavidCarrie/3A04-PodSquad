import React, { useReducer } from 'react';
// import axios from 'axios';
import ls from 'local-storage';

import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import {
	LOGIN_USER,
	LOGIN_FAILED,
	LOGOUT,
	UPDATE_USER
} from '../types';

const LS_KEY = 'podsquad-userinfo';

const AuthState = props => {
	const nullUser = {
		userId: null,
		username: null,
		firstName: null,
		lastName: null,
		email: null,
		bio: null,
	}
	
	const initialState = {
		isAuthenticated: false,
		user: {...nullUser} 
	};

	const [state, dispatch] = useReducer(authReducer, ls.get(LS_KEY) || initialState);

	// Log user in
	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const user = {...nullUser, 
			userId: 32,
			username: formData.username || 'podcastLover101',
			firstName: formData.firstName || 'Jon',
			lastName: formData.lastName || 'Snow',
			email: formData.email
		};

		try {
			// const res = await axios.post('/api/auth', formData, config);
			// console.log(res.data);

			dispatch({
				type: LOGIN_USER,
				payload: user
			});

			if (localStorage.token) {
				setAuthToken(localStorage.token);
			}

			ls.set(LS_KEY, { user: user, isAuthenticated: true });
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
		ls.set(LS_KEY, initialState);
	}

	const updateUser = async profile => {
		dispatch({ type: UPDATE_USER, payload: profile});
		ls.set(LS_KEY, { ...state, user: { ...state.user, ...profile } });
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				login,
				logout,
				signup,
				updateUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;