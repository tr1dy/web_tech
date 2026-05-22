import React, { useEffect, useState, useContext } from 'react';
import { fetchBooksByName } from '../api/api';
import BookCard from '../components/BookCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadInitialBooks = async () => {
      setLoading(true);
      
      try {
        const searchPromises = [
          fetchBooksByName('С++'),
          fetchBooksByName('Виктор Пелевин'),
          fetchBooksByName('Стивен Кинг')
        ];

        const results = await Promise.all(searchPromises);
        let allBooks = results.flat();

        setBooks(allBooks);
      } catch (error) {
        console.error("Ошибка при загрузке стартовых книг:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialBooks();
  }, []);


  const handleToggleFavorite = (book) => {
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

  if (loading) {
    return <div className="loading-state">Загрузка интересных книг...</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Откройте для себя новые книги</h1>
        <p>Найдите лучшие произведения для чтения на любой вкус.</p>
      </div>
      
      <div className="recipes-grid">
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            isFavorite={isFavorite(book.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;