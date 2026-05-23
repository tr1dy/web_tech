import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchBookById } from '../api/api';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const coverFromSearch = location.state?.coverUrl;
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      const data = await fetchBookById(id);
      setBook(data);
      setLoading(false);
    };
    loadBook();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!user) {
      alert("Пожалуйста, войдите, чтобы сохранить в избранное!");
      return;
    }
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  if (loading) return <div className="loading-state">Загрузка деталей книги...</div>;
  if (!book) return <div className="error-state">Книга не найдена!</div>;

  const title = book.volumeInfo?.title || 'Без названия';
  const author = book.volumeInfo?.authors?.join(', ') || 'Неизвестный автор';
  const thumbnail = coverFromSearch || book.volumeInfo?.imageLinks?.thumbnail || 'https://placehold.co/200x300?text=Нет+обложки';
  const categories = book.volumeInfo?.categories?.join(', ') || 'Жанр не указан';
  const description = book.volumeInfo?.description || 'Описание отсутствует.';
  const publishedDate = book.volumeInfo?.publishedDate || 'Неизвестно';
  const previewLink = book.volumeInfo?.previewLink;

  return (
    <div className="book-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Назад
      </button>

      <div className="book-header">
        <img 
          src={thumbnail} 
          alt={title} 
          className="detail-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/200x300?text=Нет+обложки';
          }}
        />
        <div className="book-title-section">
          <h2>{title}</h2>
          <p className="tags">{author} | {categories}</p>
          <button className="favorite-action-btn" onClick={handleToggleFavorite}>
            {isFavorite(book.id) ? (
              <><FaHeart color="#ff5722" /> Удалить из избранного</>
            ) : (
              <><FaRegHeart /> Добавить в избранное</>
            )}
          </button>
        </div>
      </div>

      <div className="book-content">
        <div className="ingredients">
          <h3>Информация</h3>
          <ul>
            <li><strong>Автор:</strong> {author}</li>
            <li><strong>Год издания:</strong> {publishedDate}</li>
            <li><strong>Жанры:</strong> {categories}</li>
          </ul>
        </div>
        
        <div className="instructions">
          <h3>Описание</h3>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </div>
      
      {previewLink && (
        <div className="video-section">
          <a href={previewLink} target="_blank" rel="noopener noreferrer" className="youtube-link">
            Предпросмотр в Open Library
          </a>
        </div>
      )}
    </div>
  );
};

export default BookDetails;