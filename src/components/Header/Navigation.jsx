import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import cls from './Navigation.module.css';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { search } = useLocation();

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<nav className={cls.nav}>
			<div className={cls.burger} onClick={toggleMenu}>
				<div className={cls.bar}></div>
				<div className={cls.bar}></div>
				<div className={cls.bar}></div>
			</div>

			<div className={`${cls.nav_links} ${menuOpen ? cls.open : ''}`}>
				<NavLink
					to={`/${search}`}
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

			</div>
		</nav>
	);
};

export default Navigation;
