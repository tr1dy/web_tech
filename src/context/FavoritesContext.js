import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favorites_books');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites_books', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (!prev.find(fav => fav.id === book.id)) {
        return [...prev, book];
      }
      return prev;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter(book => book.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(book => book.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};