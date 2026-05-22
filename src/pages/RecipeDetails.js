import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealById } from '../api/api';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true);
      const data = await fetchMealById(id);
      setMeal(data);
      setLoading(false);
    };
    loadMeal();
  }, [id]);

  const handleToggleFavorite = () => {
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

  if (loading) return <div className="loading-state">Загрузка деталей рецепта...</div>;
  if (!meal) return <div className="error-state">Рецепт не найден!</div>;

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Назад
      </button>

      <div className="recipe-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-image" />
        <div className="recipe-title-section">
          <h2>{meal.strMeal}</h2>
          <p className="tags">{meal.strCategory} | {meal.strArea}</p>
          <button className="favorite-action-btn" onClick={handleToggleFavorite}>
            {isFavorite(meal.idMeal) ? (
              <><FaHeart color="#ff5722" /> Удалить из избранного</>
            ) : (
              <><FaRegHeart /> Добавить в избранное</>
            )}
          </button>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients">
          <h3>Ингредиенты</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="instructions">
          <h3>Инструкции</h3>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
      
      {meal.strYoutube && (
        <div className="video-section">
          <h3>Видеоурок</h3>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube-link">
            Смотреть на YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
