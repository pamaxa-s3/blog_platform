import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../../assets/icons';
import cls from './SearchBar.module.css';

const SearchBar = ({ placeholder, value, onChange, onSubmit }) => {
	const inputId = useId();
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		const query = value.trim();
		if (!query) return;

		navigate(`/search?q=${encodeURIComponent(query)}`);
		onSubmit?.(); // 👈 повідомляємо батьківський компонент
	}

	return (
		<form className={cls.searchContainer} onSubmit={handleSubmit}>
			<label htmlFor={inputId} className={cls.label}>
				<input
					id={inputId}
					type="text"
					className={cls.inputSearch}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<button type="submit" className={cls.iconButton}>
					<SearchIcon className={cls.searchIcon} />
				</button>
			</label>
		</form>
	);
};


export default SearchBar;
