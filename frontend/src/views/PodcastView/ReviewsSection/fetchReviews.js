// temp fake reviews

const fakeReviews = [
  {
    id: 0, 
    author: 'areeba',
    starRating: 3,
    reviewText: 'Amazing podcast. I love this series, very insightful messages!'
  },
  {
    id: 1,
    author: 'brandon',
    starRating: 1,
    reviewText: 'This podcast was a big waste of my time. I would never watch this again, the quality was bad and the sound quality was also bad, it seemed like they just put together a last minute podcast and it turned out horrible.'
  },
  {
    id: 2,
    author: 'david',
    starRating: 5,
    reviewText: 'Cras semper lobortis elit a tempor. Nam sapien tellus, molestie mollis cursus a, aliquam et nibh. Duis eu nulla ornare, malesuada arcu nec, iaculis lectus. Ut vitae lacus vitae sem volutpat cursus. In tempus lobortis facilisis. Vivamus non eros pellentesque, lacinia ligula ac, ultrices enim. '
  },
  {
    id: 3,
    author: 'cameron',
    starRating: 4,
    reviewText: ''
  },
  {
    id: 4,
    author: 'eric',
    starRating: 5,
    reviewText: 'Very cool!'
  },
]

/**
 * Returns a Promise that resolves to a list of review objects, example format above.
 */
function getReviews(podcastId) {
  return new Promise((resolve, reject) => {
    resolve(fakeReviews);
  });
}

/**
 * Returns a Promise that resolves to a new Review object with {id, author, starRating, reviewText}
 */
function postReview({ podcastId, userId, starRating, reviewText}) {
  return new Promise((resolve, reject) => {
    resolve({
      id: 'someReviewId',
      author: 'currentUser',
      starRating: starRating, 
      reviewText: reviewText
    });
  })
}

export {
  getReviews, 
  postReview
}