import React, { useState, useEffect, useContext } from 'react';
import { fetchMealsByName, fetchCategories, fetchMealsByCategory } from '../api/api';
import RecipeCard from '../components/RecipeCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState([]);
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
    const data = await fetchMealsByName(searchTerm);
    setMeals(data);
    setLoading(false);
  };

  const handleCategoryClick = async (categoryName) => {
    setActiveCategory(categoryName);
    setSearchTerm(''); // Reset search term when clicking category
    setLoading(true);
    const data = await fetchMealsByCategory(categoryName);
    setMeals(data);
    setLoading(false);
  };

  const handleToggleFavorite = (meal) => {
    if (!user) {
      alert("Пожалуйста, войдите, чтобы сохранить в избранное!");
      return;
    }
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Поиск рецептов</h2>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Введите название блюда (например, Arrabiata)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Искать</button>
        </form>
      </div>

      <div className="categories-section">
        <h3>Или выберите категорию</h3>
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
            {meals && meals.length > 0 ? (
              <div className="recipes-grid">
                {meals.map(meal => (
                  <RecipeCard 
                    key={meal.idMeal} 
                    meal={meal} 
                    isFavorite={isFavorite(meal.idMeal)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                {activeCategory || searchTerm ? "Рецепты не найдены. Попробуйте другой запрос!" : "Введите поисковый запрос или выберите категорию для начала."}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
