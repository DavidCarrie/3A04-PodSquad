import { useState } from 'react';
import {
  Form, 
  Button
} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { StarFill } from 'react-bootstrap-icons';

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

export default function ReviewsSection() {
  return (<>
    <h3>Reviews</h3>
    <div style={{ width: '70%' }}>
      <CreateReviewSection onSubmit={(starRating, reviewText) => console.log(starRating, reviewText)} />
    </div>
  </>
  );
}