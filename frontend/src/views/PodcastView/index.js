import { useContext, useEffect, useState } from 'react';
import {
	Container,
	Row, Col,
	Card,
	Form,
	Button
} from 'react-bootstrap';
// import * as $ from "jquery";
import axios from 'axios';

import ReviewsSection from './ReviewsSection';

import PodcastContext from '../../context/podcast/podcastContext';

import Player from './Player';

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = "17d5bf25cae142aaa9512ecff18c1bca";
const redirectUri = "http://localhost:3000/podcast";
const scopes = [
	"user-modify-playback-state",
	""
];
// Get the hash of the url
const hash = window.location.hash
	.substring(1)
	.split("&")
	.reduce(function (initial, item) {
		if (item) {
			var parts = item.split("=");
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {});
window.location.hash = "";

const mapPodcastId_to_SpotifyEpId = pid => {
	if (pid === '23928371') return '2mk8EwUS472zDOgIDnJV35';
	else return '';
}

const PodcastView = () => {
	const podcastContext = useContext(PodcastContext);
	const { play } = podcastContext;
	const [ snippetStart, setSnippetStart ] = useState('');
	const [ snippetEnd, setSnippetEnd ] = useState('');

	const [metadata, setMetadata] = useState({
		item: '',
		is_playing: false,
		progress_ms: 0
	});

	let t = window.location.href.split('id=');
	t = t[t.length - 1];
	t = t.split('&')[0];
	const episodeId = mapPodcastId_to_SpotifyEpId(t);

	const { item, is_playing, progress_ms } = metadata;

	let tempToken = '';

	const [token, setToken] = useState({
		token: ''
	});

	const onClick = e => {
		play({
			playerInstance: new window.Spotify.Player({ name: "..." }),
			spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
		});
	}

	const getCurrentlyPlaying = async (token) => {
		// Make a call using the token
		// $.ajax({
		//     url: "https://api.spotify.com/v1/me/player/play",
		//     type: "PUT",
		//     beforeSend: (xhr) => {
		//         xhr.setRequestHeader("Authorization", "Bearer " + token);
		//     },
		//     success: (data) => {
		//         if(!data) {
		//             console.log("No data");
		//             return;
		//         }
		//         setMetadata({
		//             item: data.item,
		//             is_playing: data.is_playing,
		//             progress_ms: data.progress_ms,
		//         });
		//     }
		// });
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		};

		const body = {
			"context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
			"offset": {
				"position": 5
			},
			"position_ms": 0
		}
		try {
			const res = await axios.put('https://api.spotify.com/v1/me/player/play', body, config);
			console.log(res.data);
		} catch (error) {
			// dispatch({ type: LOGIN_FAILED });
			console.log("Request failed");
		}
	}

	useEffect(() => {
		// Set token
		let _token = hash.access_token;
		if (_token) {
			// Set token
			tempToken = _token;
		}
	})

	useEffect(() => {
		setToken({
			token: tempToken
		});
		getCurrentlyPlaying(token.token);
		console.log(token.token);
	}, [tempToken])

	return (
		<Container fluid style={{width: '80%'}}>
			<Row>
				<Col xs={8}>
					<header className="App-header">
						{!token.token && (
							<a
								className="btn btn--loginApp-link btn-secondary"
								href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
							>
								Login to Spotify
							</a>
						)}
						{token.token && (
							// Spotify stuff
							<a>Logged in!</a>
						)}
					</header>
					<h1>{token.token && item}</h1>
					{item && (
						<Player
							item={item}
							is_playing={is_playing}
							progress_ms={progress_ms}
						/>
					)}
					<iframe src={"https://open.spotify.com/embed-podcast/episode/" + episodeId} width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
				</Col>
				{episodeId !== '' ? <Col>
					<Card style={{padding: 0}} border='secondary'>
						<Card.Header>Snippet Controller</Card.Header>
						<Card.Body>
							<Card.Title>Create a snippet</Card.Title>
							<Form>
								<Form.Group>
									<Form.Label>Start time</Form.Label>
									<Form.Control required placeholder="h:mm:ss"
										onChange={e => setSnippetStart(e.target.value.replaceAll(':', ''))}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>End time</Form.Label>
									<Form.Control required placeholder="h:mm:ss" 
										onChange={e => setSnippetEnd(e.target.value.replaceAll(':',''))}
									/>
								</Form.Group>
								<Form.Row>
									<Button variant="primary" onClick={() => (
										alert("Podcast snippet created successfully!")
									)}>Create</Button>
									<Button variant="secondary">Play</Button>
									<Button variant="info" onClick={() => {
										const el = document.createElement('textarea');
										el.value = window.location.href + "&start=" + snippetStart + "&end=" + snippetEnd;
										document.body.appendChild(el);
										el.select();
										document.execCommand('copy');
										document.body.removeChild(el);
										alert('Podcast Snippet URL saved to clipboard!');
									}}>Share</Button>
								</Form.Row>
							</Form>
						</Card.Body>
					</Card>
				</Col> : <></>}

			</Row>
			{episodeId !== '' ? <Row>
				<Col><ReviewsSection /></Col>
			</Row> : <></>}

		</Container>

	);
}

export default PodcastView;