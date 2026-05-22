const mapOpenLibraryToBook = (doc) => {
  const id = doc.key ? doc.key.replace('/works/', '') : Math.random().toString();
  return {
    id: id,
    volumeInfo: {
      title: doc.title,
      authors: doc.author_name || ['Неизвестный автор'],
      imageLinks: {
        thumbnail: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null
      },
      categories: doc.subject ? doc.subject.slice(0, 3) : [],
      description: doc.first_sentence ? (typeof doc.first_sentence === 'string' ? doc.first_sentence : doc.first_sentence.value) : 'Описание отсутствует.',
      pageCount: doc.number_of_pages_median || null,
      publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : null,
      previewLink: `https://openlibrary.org/works/${id}`
    }
  };
};

export const fetchBooksByName = async (name) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(name)}&limit=40`);
    const data = await response.json();
    return (data.docs || []).map(mapOpenLibraryToBook);
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`);
    const doc = await response.json();
    
    let authors = ['Неизвестный автор'];
    if (doc.authors && doc.authors.length > 0) {
      try {
        const authorPromises = doc.authors.map(a => 
          fetch(`https://openlibrary.org${a.author.key}.json`).then(r => r.json())
        );
        const authorsData = await Promise.all(authorPromises);
        authors = authorsData.map(a => a.name || a.personal_name || 'Неизвестный автор');
      } catch (e) {
        console.error("Error fetching authors:", e);
      }
    }

    return {
      id: id,
      volumeInfo: {
        title: doc.title,
        authors: authors,
        imageLinks: {
          thumbnail: doc.covers && doc.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${doc.covers[0]}-L.jpg` : null
        },
        categories: doc.subjects ? doc.subjects.slice(0, 3) : [],
        description: doc.description ? (typeof doc.description === 'string' ? doc.description : doc.description.value) : 'Описание не предоставлено.',
        pageCount: null,
        publishedDate: doc.first_publish_date || null,
        previewLink: `https://openlibrary.org/works/${id}`
      }
    };
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  return [
    { idCategory: 'Фантастика', strCategory: 'Фантастика' },
    { idCategory: 'Детектив', strCategory: 'Детектив' },
    { idCategory: 'Роман', strCategory: 'Роман' },
    { idCategory: 'История', strCategory: 'История' },
    { idCategory: 'Программирование', strCategory: 'Программирование' }
  ];
};

export const fetchBooksByCategory = async (category) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?subject=${encodeURIComponent(category)}&limit=40`);
    const data = await response.json();
    return (data.docs || []).map(mapOpenLibraryToBook);
  } catch (error) {
    console.error("Error fetching books by category:", error);
    return [];
  }
};
