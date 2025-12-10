import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import cls from './Header.module.css';

const Navigation = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<nav className={cls.nav}>
			{/* Бургер для мобільних */}
			<div className={cls.burger} onClick={toggleMenu}>
				<div className={cls.bar}></div>
				<div className={cls.bar}></div>
				<div className={cls.bar}></div>
			</div>

			<div className={`${cls.nav_links} ${menuOpen ? cls.open : ''}`}>
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? cls.active : '')}
				>
					Home
				</NavLink>
				<NavLink
					to="/categories"
					className={({ isActive }) => (isActive ? cls.active : '')}
				>
					Categories
				</NavLink>
				<NavLink
					to="/authors"
					className={({ isActive }) => (isActive ? cls.active : '')}
				>
					Authors
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) => (isActive ? cls.active : '')}
				>
					About
				</NavLink>
			</div>
		</nav>
	);
};

export default Navigation;
