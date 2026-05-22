import React, { useState, useEffect, useContext } from 'react';
import { fetchBooksByName, fetchCategories, fetchBooksByCategory } from '../api/api';
import BookCard from '../components/BookCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setActiveCategory(''); // Reset category when searching by text
    const data = await fetchBooksByName(searchTerm);
    setBooks(data);
    setLoading(false);
  };

  const handleCategoryClick = async (categoryName) => {
    setActiveCategory(categoryName);
    setSearchTerm(''); // Reset search term when clicking category
    setLoading(true);
    const data = await fetchBooksByCategory(categoryName);
    setBooks(data);
    setLoading(false);
  };

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

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Поиск книг</h2>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Введите название книги или автора..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Искать</button>
        </form>
      </div>

      <div className="categories-section">
        <h3>Или выберите жанр</h3>
        <div className="categories-list">
          {categories.map(cat => (
            <button 
              key={cat.idCategory}
              className={`category-btn ${activeCategory === cat.strCategory ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.strCategory)}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>

      <div className="results-section">
        {loading ? (
          <div className="loading-state">Поиск...</div>
        ) : (
          <>
            {books && books.length > 0 ? (
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
            ) : (
              <div className="no-results">
                {activeCategory || searchTerm ? "Книги не найдены. Попробуйте другой запрос!" : "Введите поисковый запрос или выберите жанр для начала."}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;