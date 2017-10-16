import React from 'react';
import PropTypes from 'prop-types';

import Ratings from './Ratings';

const BookCard = ({ bookName,
  bookID,
  synopsis,
  ratingSum,
  ratingCount,
  imgHref,
  bookAuthors }) => {
  const rateCount = parseInt(ratingCount, 10);
  // convert to integer
  const numAuthors = bookAuthors.length;
  const authors = bookAuthors.map((authorsSplit, index) =>
    (<span key={authorsSplit.id}>
      <a href={authorsSplit.id}>{authorsSplit.authorAKA}</a>
      {index < (numAuthors - 1) && ', '}
    </span>),
  );
  return (
    <li className="carousel-card">
      <div>
        <a href={`books/${bookID}`}>
          <div className="carousel-image">
            <img
              src={imgHref}
              style={{ width: 97, height: 150 }}
              alt=""
            />
          </div>
          <span>
            {bookName}
          </span>
        </a>
        <Ratings
          rateSum={ratingSum}
          ratingCount={rateCount}
        />
        <div className="c-row c-small-text">
          <span className="c-small-text">
            {authors}
          </span>
        </div>
      </div>
    </li>
  );
};
BookCard.defaultProps = {
  ratingSum: null,
};

BookCard.propTypes = {
  bookName: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  imgHref: PropTypes.string.isRequired,
  ratingCount: PropTypes.string.isRequired,
  ratingSum: PropTypes.string,
  bookAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookCard;
