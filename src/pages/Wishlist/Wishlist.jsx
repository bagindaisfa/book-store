import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../../components/Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const URL = "http://localhost:3001/api/items";

const Wishlist = () => {
    
  const [loading, setLoading] = useState(false);
  const [books, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await fetch(`${URL}`);
        const data = await response.json();
        console.log(data);

        if(data){
            const newBooks = data.slice(0, 20).map((bookSingle) => {
                return {
                  kind: bookSingle.kind,
                  id: bookSingle.id,
                  etag: bookSingle.etag,
                  selfLink: bookSingle.selfLink,
                  volumeInfo: bookSingle.volumeInfo,
                  saleInfo: bookSingle.saleInfo,
                  accessInfo: bookSingle.accessInfo,
                  searchInfo: bookSingle.searchInfo,
                };
            });
          setBook(newBooks);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, []);

  if(loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>
        {books?.map((book) => {
            return (
                <div className='book-details-content grid'>
                    <div className='book-details-img'>
                        <img src = {book?.volumeInfo.imageLinks.smallThumbnail} alt = "cover img" />
                    </div>
                    <div className='book-details-info'>
                        <div className='book-details-item title'>
                            <span className='fw-6 fs-24'>{book?.volumeInfo.title}</span>
                        </div>
                        <div className='book-details-item description' dangerouslySetInnerHTML={{ __html: book?.volumeInfo.description }} />
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
        )}
      </div>
    </section>
  )
};

export default Wishlist;

