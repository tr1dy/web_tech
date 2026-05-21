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
      alert("Please login to save favorites!");
      return;
    }
    
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading delicious meals...</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Discover Delicious Recipes</h1>
        <p>Find the best recipes for your daily meals or special occasions.</p>
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
