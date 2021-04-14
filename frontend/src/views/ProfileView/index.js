import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
	Card,
	Form,
	Col,
	Button
} from 'react-bootstrap';

import AuthContext from '../../context/auth/authContext';
import { getProfile, updateProfile } from './fetchProfile';

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

	function Profile({firstName, lastName, username, email, bio}) {
		return <>
			<Card.Title as="h2" className="text-primary">{firstName} {lastName}</Card.Title>
			<Card.Subtitle className="text-info">@{username}</Card.Subtitle>
			<br />
			<p><strong>Email: </strong> {email}</p>
			<div><p><strong>Bio: </strong><em>{bio}</em></p></div>
		</>;
	}

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
		updateProfile(profile.username, profile);
	}

	const usernameFromUrl = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];

	const ShareBtn = <Button variant='primary' size='sm'
		onClick={() => {
			const el = document.createElement('textarea');
			el.value = window.location.href;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			alert('User profile link copied to clipboard!');
		}}
	>Share</Button>;

	const ownProfile = <Card style={{ width: '50%', left: '25%', padding: 0 }}>
		<Card.Header>User Profile
				{editable ? <></> :
				<span style={{ position: 'absolute', right: 10, top: 9 }}>
					<Button variant="outline-info" size="sm"
						onClick={() => setEditable(true)}
					>Edit profile</Button>
					{ShareBtn}
				</span>
				}
		</Card.Header>
		<Card.Body>
			{editable ? ProfileForm : <Profile 
				firstName={profile.firstName} 
				lastName={profile.lastName}
				username={profile.username}
				email={profile.email}
				bio={profile.bio}
			/>}
		</Card.Body>
	</Card>;

	const Body = () => {
		if (usernameFromUrl === 'profile' || usernameFromUrl === '') return <Redirect to={'/profile/'+profile.username}/>
		else if (usernameFromUrl === profile.username) return ownProfile;
		else {
			let other = getProfile(usernameFromUrl);
			if (other != null) return <Card style={{ width: '50%', left: '25%', padding: 0 }}>
				<Card.Header>User Profile <span style={{ position: 'absolute', right: 10, top: 9 }}>
					{ShareBtn}</span></Card.Header>
				<Card.Body>
					<Profile
						firstName={other.firstName}
						lastName={other.lastName}
						username={other.username}
						email={other.email}
						bio={other.bio}
					/>
				</Card.Body>
			</Card>;
		}
		return <>No profile found.</>
	}

	return <Body />;
}