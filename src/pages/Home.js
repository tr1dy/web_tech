import React, { useEffect, useState, useContext } from 'react';
import { fetchMealsByName } from '../api/api';
import RecipeCard from '../components/RecipeCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadInitialMeals = async () => {
      setLoading(true);
      // Fetch some popular meals as initial display
      const data = await fetchMealsByName('chicken');
      setMeals(data);
      setLoading(false);
    };

    loadInitialMeals();
  }, []);

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

  if (loading) {
    return <div className="loading-state">Загрузка вкусных рецептов...</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Откройте для себя вкусные рецепты</h1>
        <p>Найдите лучшие рецепты для повседневных блюд или особых случаев.</p>
      </div>
      
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
    </div>
  );
};

export default Home;
