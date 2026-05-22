import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { favorites, isFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  const handleToggleFavorite = (book) => {
    removeFavorite(book.id);
  };

  if (!user) {
    return (
      <div className="favorites-container empty-state">
        <h2>Вы не авторизованы!</h2>
        <p>Пожалуйста, <Link to="/login">войдите</Link>, чтобы просматривать и управлять избранными книгами.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Ваши избранные книги</h2>
        <p>У вас {favorites.length} сохраненных книг.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h3>Пока нет избранного.</h3>
          <p>Перейдите на страницу <Link to="/search">Поиска</Link>, чтобы найти интересные книги для сохранения!</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {favorites.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              isFavorite={isFavorite(book.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;