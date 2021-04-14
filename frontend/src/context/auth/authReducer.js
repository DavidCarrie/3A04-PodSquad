import {
	LOGIN_USER,
	LOGIN_FAILED,
	AUTH_ERROR,
	LOGOUT,
	UPDATE_USER
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state, 
				isAuthenticated: true,
				user: action.payload,
			}
		case LOGOUT:
			return {
				...state, 
				isAuthenticated: false,
				user: null,
			}
		case UPDATE_USER:
			return {
				...state, 
				user: {
					...state.user, 
					...action.payload
				}
			}
		case AUTH_ERROR:
		case LOGIN_FAILED: 
		default:
			return state;
	}
}