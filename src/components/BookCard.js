import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './BookCard.css';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  const title = book.volumeInfo?.title || 'Без названия';
  const author = book.volumeInfo?.authors?.join(', ') || 'Неизвестный автор';
  const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=Нет+обложки';
  const category = book.volumeInfo?.categories?.[0] || 'Жанр не указан';

  return (
    <div className="recipe-card">
      <Link to={`/book/${book.id}`} className="recipe-image-link">
        <img src={thumbnail} alt={title} className="recipe-image" />
      </Link>
      <div className="recipe-info">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-category">{author}</p>
        <p className="recipe-category" style={{ fontSize: '0.8em', color: '#666' }}>{category}</p>
        <div className="recipe-actions">
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