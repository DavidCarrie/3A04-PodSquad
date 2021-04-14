import { useState, useEffect } from 'react';
import {
  Form, 
  Button,
  Card,
  Container
} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { StarFill } from 'react-bootstrap-icons';

import { getReviews, postReview } from './fetchReviews';

function CreateReviewSection({ onSubmit }) {
  const [ starRating, setStarRating ] = useState(0);
  const [ reviewText, setReviewText ] = useState('');

  return (<>
    <Form>
      <Form.Group>
        <Form.Label>Create your own review:</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3}
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
        />
      </Form.Group>
      <Form.Row style={{
        position: 'relative'
      }}>
        <StarRatingComponent
          name="review-stars"
          starCount={5}
          value={starRating}
          onStarClick={newVal => setStarRating(newVal)}
          renderStarIcon={() => <h5><StarFill /></h5>}
        />
        <h5 style={{position: 'relative', top: 3, left: 10}} >{starRating} star
          {starRating === 1 ? '' : 's'}
        </h5>
        <Button 
          style={{
            position: 'absolute',
            right: 0
          }} 
          variant="primary"
          onClick={() => onSubmit(starRating, reviewText)}
        >Submit</Button>        
      </Form.Row>
    </Form>
  </>);
}

function Review({ author, starRating, reviewText }) {
  return (<>
    <Card>
      <Card.Body style={{padding: 7}}>
        <h5>{author}</h5>
        <StarRatingComponent
          name={"stars-"+author}
          starCount={5}
          value={starRating}
          renderStarIcon={() => <h5><StarFill /></h5>}
          editing={false}
        /><br/>
        <em>{reviewText}</em>
      </Card.Body>
    </Card>
  </>);
}

export default function ReviewsSection({ podcastId }) {
  const [ reviews, setReviews ] = useState([]);

  useEffect(() => {
    getReviews().then(reviewList => {
      setReviews([...reviewList]);
    });
  }, []);

  const onReviewSubmit = (starRating, reviewText) => {
    postReview({starRating: starRating, reviewText: reviewText})
      .then(review => setReviews(prev => [review, ...prev]));
  }

  return (<>
    <Container style={{ width: '70%', marginLeft: 0 }}>
      <h3>Reviews</h3>
      <CreateReviewSection onSubmit={onReviewSubmit} />
      <br />
      <div>
        {reviews.map((review, id) => (
          <Review key={'review-'+id} author={review.author} 
            starRating={review.starRating} reviewText={review.reviewText} />
        ))}
      </div>
    </Container>
  </>
  );
}