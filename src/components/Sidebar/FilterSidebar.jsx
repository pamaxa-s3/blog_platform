import { useState, useEffect, useRef } from 'react';
import cls from './FilterSidebar.module.css';

const STORAGE_KEY = 'blog_filters';
const DEBOUNCE_DELAY = 400;

const FilterSidebar = ({ categories, authors, onFilterChange, savedFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debounceRef = useRef(null);

  /* === INIT FROM URL OR LOCALSTORAGE === */
  useEffect(() => {
    if (
      savedFilters.categories.length ||
      savedFilters.author ||
      savedFilters.sort
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategories(savedFilters.categories);
      setSelectedAuthor(savedFilters.author);
      setSortBy(savedFilters.sort);
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedCategories(parsed.categories || []);
        setSelectedAuthor(parsed.author || '');
        setSortBy(parsed.sort || '');
      }
    }
  }, [savedFilters]);

  /* === DEBOUNCED UPDATE === */
  useEffect(() => {
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const filters = {
        categories: selectedCategories,
        author: selectedAuthor,
        sort: sortBy
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
      onFilterChange(filters);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceRef.current);
  }, [selectedCategories, selectedAuthor, sortBy]);

  /* === HANDLERS === */
  function toggleCategory(id) {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(cid => cid !== id)
        : [...prev, id]
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedAuthor('');
    setSortBy('');
    localStorage.removeItem(STORAGE_KEY);
    onFilterChange({ categories: [], author: '', sort: '' });
  }

  return (
    <aside className={`${cls.sidebar} ${isOpen ? cls.open : ''}`}>
      {/* MOBILE TOGGLE */}
      <button
        className={cls.toggleButton}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Фільтри
      </button>

      <div className={cls.content}>
        <h2 className={cls.title}>Фільтри</h2>

        {/* CATEGORY */}
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
            onChange={(e) => setSelectedAuthor(e.target.value)}
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
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Без сортування</option>
            <option value="date">За датою</option>
            <option value="popular">За популярністю</option>
            <option value="title">За назвою</option>
          </select>
        </div>

        {/* RESET */}
        <button className={cls.resetButton} onClick={resetFilters}>
          Скинути фільтри
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
