import { useState, useEffect } from "react";
import cls from "./FilterSidebar.module.css";

const FilterSidebar = ({ categories, authors, onFilterChange, savedFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState(savedFilters.categories || []);
  const [selectedAuthor, setSelectedAuthor] = useState(savedFilters.author || "");
  const [sortBy, setSortBy] = useState(savedFilters.sort || "");

  // === UPDATE LOCAL CHECKBOXES WHEN URL FILTERS CHANGE ===
  useEffect(() => {
    setSelectedCategories(savedFilters.categories);
    setSelectedAuthor(savedFilters.author);
    setSortBy(savedFilters.sort);
  }, [savedFilters]);

  function handleCategoryChange(e, categoryId) {
    let updated;

    if (e.target.checked) {
      updated = [...selectedCategories, categoryId];
    } else {
      updated = selectedCategories.filter(id => id !== categoryId);
    }

    setSelectedCategories(updated);
    onFilterChange({
      categories: updated,
      author: selectedAuthor,
      sort: sortBy
    });
  }

  function handleAuthorChange(e) {
    const value = e.target.value;
    setSelectedAuthor(value);

    onFilterChange({
      categories: selectedCategories,
      author: value,
      sort: sortBy
    });
  }

  function handleSortChange(e) {
    const value = e.target.value;
    setSortBy(value);

    onFilterChange({
      categories: selectedCategories,
      author: selectedAuthor,
      sort: value
    });
  }

  return (
    <aside className={cls.sidebar}>
      <h2>Фільтри</h2>

      {/* CATEGORY FILTER */}
      <div className={cls.filterSection}>
        <h3>Категорії</h3>
        <div className={cls.filterGroup}>
          {categories.map(category => (
            <label key={category.id}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => handleCategoryChange(e, category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* AUTHOR FILTER */}
      <div className={cls.filterSection}>
        <h3>Автор</h3>
        <select value={selectedAuthor} onChange={handleAuthorChange}>
          <option value="">Всі автори</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      {/* SORTING */}
      <div className={cls.filterSection}>
        <h3>Сортувати</h3>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Без сортування</option>
          <option value="date">За датою</option>
          <option value="popular">За популярністю</option>
          <option value="title">За назвою</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;