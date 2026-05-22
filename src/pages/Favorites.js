import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const { favorites, isFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  const handleToggleFavorite = (meal) => {
    // Only removing is possible from here, technically. But we use the same function.
    removeFavorite(meal.idMeal);
  };

  if (!user) {
    return (
      <div className="favorites-container empty-state">
        <h2>Вы не авторизованы!</h2>
        <p>Пожалуйста, <Link to="/login">войдите</Link>, чтобы просматривать и управлять избранными рецептами.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Ваши избранные рецепты</h2>
        <p>У вас {favorites.length} сохраненных рецептов.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h3>Пока нет избранного.</h3>
          <p>Перейдите на страницу <Link to="/search">Поиска</Link>, чтобы найти вкусные рецепты для сохранения!</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {favorites.map(meal => (
            <RecipeCard 
              key={meal.idMeal} 
              meal={meal} 
              isFavorite={isFavorite(meal.idMeal)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
