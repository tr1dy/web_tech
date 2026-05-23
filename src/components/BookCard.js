import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './BookCard.css';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  const title = book.volumeInfo?.title || 'Без названия';
  const author = book.volumeInfo?.authors?.join(', ') || 'Неизвестный автор';
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || 'https://placehold.co/200x300?text=Нет+обложки';
  const categories = book.volumeInfo?.categories?.join(', ') || 'Жанр не указан';

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-image-link">
        <img 
          src={thumbnail} 
          alt={title} 
          className="book-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/200x300?text=Нет+обложки';
          }}
        />
      </Link>
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-category">{author}</p>
        <p className="book-category" style={{ fontSize: '0.8em', color: '#666' }}>{categories}</p>
        <div className="book-actions">
          <Link to={`/book/${book.id}`} className="view-btn">Подробнее</Link>
          <button 
            className="favorite-btn" 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(book);
            }}
          >
            {isFavorite ? <FaHeart color="#ff5722" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;