import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./BookList.css";
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Book = (book) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    // Toggle the liked status
    
    setIsLiked((prevIsLiked) => !prevIsLiked);
    const url = 'http://localhost:3001/api/items';
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then(response => response.json())
      .then(responseData => {
        alert("Successfully add to your wishlist.")
        console.log('Success:', responseData);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-info-item heart-icon' onClick={handleHeartClick}>
          <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : 'gray'} />
        </div>
      <div className='book-item-img'>
        <img src={book.volumeInfo.imageLinks.thumbnail} alt="cover" />
      </div>
      <div className='book-item-info text-center'>
        <Link to={`/book/${book.id}`} {...book}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{book.volumeInfo.title}</span>
          </div>
        </Link>

        {/* Heart icon */}
        
        
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Author: </span>
          <span>{book.volumeInfo.authors? book.volumeInfo.authors[0]:"Unknown"}</span>
        </div>

        <div className='book-item-info-item edition-count fs-15'>
          <StarRatings
            rating={book.volumeInfo.averageRating}
            starRatedColor="#f3f31a"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="5px"
          />
        </div>

        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>Publish Year: </span>
          <span>{new Date(book.volumeInfo.publishedDate).getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default Book;
