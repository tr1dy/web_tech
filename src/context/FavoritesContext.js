import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (meal) => {
    setFavorites((prev) => {
      if (!prev.find(fav => fav.idMeal === meal.idMeal)) {
        return [...prev, meal];
      }
      return prev;
    });
  };

  const removeFavorite = (idMeal) => {
    setFavorites((prev) => prev.filter(meal => meal.idMeal !== idMeal));
  };

  const isFavorite = (idMeal) => {
    return favorites.some(meal => meal.idMeal === idMeal);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
