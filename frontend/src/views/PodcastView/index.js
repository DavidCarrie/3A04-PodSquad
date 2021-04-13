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
					<Row>
						<Col>
							Spotify web player here						
						</Col>
					</Row>
					<Row>
						<Col>
							Snippet controller here
						</Col>
					</Row>
				</Col>
				<Col xs={4}>
					<ReviewsSection />
				</Col>
			</Row>
		</Container>

	);
}

export default PodcastView;