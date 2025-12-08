import { useId } from 'react';
import {SearchIcon} from '../../assets/icons'
import cls from './Header.module.css';

const SearchBar = ({ placeholder,value, onChange }) => {
	const inputId = useId();

	return (
		<div className={cls.searchContainer}>
			<label htmlFor={inputId}>
			<SearchIcon className={cls.searchIcon} />
			</label>
			<input type="text" id={inputId} className={cls.inputSearch} placeholder={placeholder} value={value} onChange={onChange} />
		</div>
	);
};

export default SearchBar;
