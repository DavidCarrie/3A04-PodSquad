import React, { useReducer } from 'react';
import axios from 'axios';

import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import {
	LOGIN_USER,
	LOGIN_FAILED,
	USER_LOADED,
	AUTH_ERROR
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

	// Load User
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			// const res = await axios.get('/api/auth');
			dispatch({
				type: USER_LOADED, payload: {
					// FAKE DATA
					userId: 32,
					username: 'podcastLover101',
					firstName: 'Jon',
					lastName: 'Snow'
				}
			});
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// Log user in
	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			// const res = await axios.post('/api/auth', formData, config);
			// do we need to dispatch this, if we're calling the loadUser function which 
			// will also dispatch a thing to update what user we have? 

			// dispatch({
			//     type: LOGIN_USER,
			//     payload: {
			// 			// FAKE DATA HERE
			// 			result: 0, // 0 = success, 1 = failed
			// 			user: {
			// 				userId: 32,
			// 				username: 'podcastLover101',
							
			// 			}
			// 		}
			// });
			// console.log(res.data);
			loadUser();
		} catch (error) {
			dispatch({ type: LOGIN_FAILED, payload: { reason: 'Invalid user or password.' } });
			console.log("Request failed");
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