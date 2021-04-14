import {
	LOGIN_FAILED,
	USER_LOADED,
	AUTH_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state, 
				isAuthenticated: true,
				user: action.payload,
				username: action.payload.username,
			}
		break;
		case AUTH_ERROR:
		case LOGIN_FAILED: 
		default:
			return state;
	}
}