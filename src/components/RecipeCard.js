import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './RecipeCard.css';

const RecipeCard = ({ meal, isFavorite, onToggleFavorite }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${meal.idMeal}`} className="recipe-image-link">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
      </Link>
      <div className="recipe-info">
        <h3 className="recipe-title">{meal.strMeal}</h3>
        <p className="recipe-category">{meal.strCategory || 'Delicious Meal'}</p>
        <div className="recipe-actions">
          <Link to={`/recipe/${meal.idMeal}`} className="view-btn">View Recipe</Link>
          <button 
            className="favorite-btn" 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(meal);
            }}
          >
            {isFavorite ? <FaHeart color="#ff5722" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
