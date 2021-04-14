import React, { useState, useContext, useReducer } from 'react';
import {
	Card,
	Form,
	Col,
	Button
} from 'react-bootstrap';

import AuthContext from '../../context/auth/authContext';

export default function ProfileView() {
	const { user, updateUser } = useContext(AuthContext);
	const [ profile, setProfile ] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username, 
		email: user.email, 
		bio: user.bio,
	});
	const [ editable, setEditable ] = useState(false);

	const Profile = <>
		<Card.Title as="h2" className="text-primary">{profile.firstName} {profile.lastName}</Card.Title>
		<Card.Subtitle className="text-info">@{profile.username}</Card.Subtitle>
		<br />
		<p><strong>Email: </strong> {profile.email}</p>
		<div><p><strong>Bio: </strong><em>{profile.bio}</em></p></div>
	</>;

	const ProfileForm = <Form onSubmit={onSubmit}>
		<Form.Row>
			<Form.Group as={Col} xs={6}>
				<Form.Label>First Name</Form.Label>
				<Form.Control 
					type="text" 
					value={profile.firstName} 
					name="firstName" 
					onChange={onChange}
					required
				></Form.Control>
			</Form.Group>
			<Form.Group as={Col} xs={6}>
				<Form.Label>Last Name</Form.Label>
				<Form.Control
					type="text"
					value={profile.lastName}
					name="lastName"
					onChange={onChange}
					required
				></Form.Control>
			</Form.Group>
		</Form.Row>
		<Form.Group>
			<Form.Label>Username</Form.Label>
			<Form.Control
				type="text"
				value={profile.username}
				name="username"
				onChange={onChange}
				required
			></Form.Control>
		</Form.Group>
		<Form.Group>
			<Form.Label>Email</Form.Label>
			<Form.Control
				type="email"
				value={profile.email}
				name="email"
				onChange={onChange}
				required
			></Form.Control>
		</Form.Group>
		<Form.Group>
			<Form.Label>Bio</Form.Label>
			<Form.Control
				as="textarea"
				rows={10}
				value={profile.bio}
				name="bio"
				onChange={onChange}
			></Form.Control>
		</Form.Group>
		<Button 
			variant="primary"
			type="submit"
		>
			Save changes
		</Button>
	</Form>

	function onChange(e) {
		setProfile(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	function onSubmit(e) {
		e.preventDefault();
		setEditable(false);
		updateUser(profile);
	}

	return (<>
		<Card style={{ width: '50%', left: '25%', padding: 0 }}>
			<Card.Header>User Profile
				{editable ? <></> : 
					<Button style={{ position: 'absolute', right: 10, top: 9 }} variant="outline-info" size="sm"
						onClick={() => setEditable(true)}
					>Edit profile</Button>
				}
			</Card.Header>
			<Card.Body>
				{editable ? ProfileForm : Profile}
			</Card.Body>
		</Card>;
	</>
	)
}