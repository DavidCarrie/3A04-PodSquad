import { useHistory } from 'react-router-dom';
import {
	Container,
	ListGroup
} from 'react-bootstrap';

const sampleEpName = 'Rationally Speaking #205 - Michael Webb on "Are ideas getting harder to find"';

export default function SearchResultsView() {
	const history = useHistory();

	let query = null;
	try {
		let t = window.location.href.split('q=');
		query = t[t.length - 1];
	} catch (err) { }

	// get search results 
	let res = [];
	query = query.replaceAll('%20', ' ');
	if (query === 'rationally speaking michael webb' ||
		query !== '' && sampleEpName.toLowerCase().includes(query.toLowerCase())) {
		res = [
			{
				to: '/podcast?id=23928371',
				episodeName: sampleEpName,
				podcastName: 'Rationally Speaking Podcast'
			}
		];
	};

	return <Container>
		<h2>Search results for: {query}</h2>
		<ListGroup>
			{res.map((item, key) => <ListGroup.Item 
				action
				key={'sq-' + key}
				onClick={() => history.push(item.to)}
			>
				{item.episodeName} <br />
				<small>by <em>{item.podcastName}</em></small>
			</ListGroup.Item>)}
			{res.length === 0 ? <p>No results found.</p> : <></>}
		</ListGroup>
	</Container>
}