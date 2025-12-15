import { useState, useEffect, useRef } from 'react';
import cls from './FilterSidebar.module.css';

const DEBOUNCE_DELAY = 400;

const FilterSidebar = ({ categories, authors, savedFilters, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debounceRef = useRef(null);

  useEffect(() => {
    setSelectedCategories(savedFilters.categories);
    setSelectedAuthor(savedFilters.author);
    setSortBy(savedFilters.sort);
  }, [savedFilters]);

  function triggerChange(next) {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onFilterChange(next);
    }, DEBOUNCE_DELAY);
  }

  function toggleCategory(id) {
    setSelectedCategories(prev => {
      const nextCategories = prev.includes(id)
        ? prev.filter(cid => cid !== id)
        : [...prev, id];

      triggerChange({
        categories: nextCategories,
        author: selectedAuthor,
        sort: sortBy
      });

      return nextCategories;
    });
  }

  function handleAuthorChange(value) {
    setSelectedAuthor(value);

    triggerChange({
      categories: selectedCategories,
      author: value,
      sort: sortBy
    });
  }

  function handleSortChange(value) {
    setSortBy(value);

    triggerChange({
      categories: selectedCategories,
      author: selectedAuthor,
      sort: value
    });
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedAuthor('');
    setSortBy('');

    onFilterChange({
      categories: [],
      author: '',
      sort: ''
    });
  }

  return (
    <aside className={`${cls.sidebar} ${isOpen ? cls.open : ''}`}>
      <button
        className={cls.toggleButton}
        onClick={() => setIsOpen(p => !p)}
      >
        Фільтри
      </button>

      <div className={cls.content}>
        <h2 className={cls.title}>Фільтри</h2>

        {/* CATEGORIES */}
        <div className={cls.section}>
          <h3>Категорії</h3>
          <div className={cls.checkboxGroup}>
            {categories.map(category => (
              <label key={category.id} className={cls.checkbox}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* AUTHOR */}
        <div className={cls.section}>
          <h3>Автор</h3>
          <select
            value={selectedAuthor}
            onChange={e => handleAuthorChange(e.target.value)}
          >
            <option value="">Всі автори</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {/* SORT */}
        <div className={cls.section}>
          <h3>Сортувати</h3>
          <select
            value={sortBy}
            onChange={e => handleSortChange(e.target.value)}
          >
            <option value="">Без сортування</option>
            <option value="date">За датою</option>
            <option value="popular">За популярністю</option>
            <option value="title">За назвою</option>
          </select>
        </div>

        <button className={cls.resetButton} onClick={resetFilters}>
          Скинути фільтри
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;