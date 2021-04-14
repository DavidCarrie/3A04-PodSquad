import {
	Container,
	Row, Col
} from 'react-bootstrap';

import ReviewsSection from './ReviewsSection';

const PodcastView = () => {
	return (
		<Container fluid>
			<Row>
				<Col xs={8}>
					Spotify web player here						
				</Col>
				<Col>
					Snippet controller here
				</Col>
			</Row>
			<Row>
				<Col><ReviewsSection /></Col>
			</Row>
		</Container>

	);
}

export default PodcastView;