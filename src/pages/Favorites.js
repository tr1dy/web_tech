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
        <h2>You are not logged in!</h2>
        <p>Please <Link to="/login">login</Link> to view and manage your favorite recipes.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Your Favorite Recipes</h2>
        <p>You have {favorites.length} saved recipes.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h3>No favorites yet.</h3>
          <p>Go to the <Link to="/search">Search</Link> page to find some delicious meals to save!</p>
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
