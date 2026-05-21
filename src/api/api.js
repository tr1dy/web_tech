const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchMealsByName = async (name) => {
  try {
    const response = await fetch(`${API_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
};

export const fetchMealById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchMealsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};
