import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import cls from './Header.module.css';

const Navigation = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [authorsOpen, setAuthorsOpen] = useState(false);
	const [postsOpen, setPostsOpen] = useState(false);

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
				<NavLink to="/" className={({ isActive }) => (isActive ? cls.active : '')}>
					Home
				</NavLink>
				<NavLink to="/about" className={({ isActive }) => (isActive ? cls.active : '')}>
					About
				</NavLink>
				<NavLink to="/categories" className={({ isActive }) => (isActive ? cls.active : '')}>
					Categories
				</NavLink>
				<NavLink to="/dashboard" className={({ isActive }) => (isActive ? cls.active : '')}>
					Dashboard
				</NavLink>
				<NavLink to="/login" className={({ isActive }) => (isActive ? cls.active : '')}>
					Login
				</NavLink>

				{/* Authors Dropdown */}
				<div
					className={cls.dropdown}
					onMouseEnter={() => setAuthorsOpen(true)}
					onMouseLeave={() => setAuthorsOpen(false)}
					onClick={() => setAuthorsOpen(!authorsOpen)}
				>
					<span className={cls.dropdown_label}>Authors</span>
					{authorsOpen && (
						<div className={cls.dropdown_menu}>
							<NavLink to="/authors/1" className={({ isActive }) => (isActive ? cls.active : '')}>
								Author 1
							</NavLink>
							<NavLink to="/authors/2" className={({ isActive }) => (isActive ? cls.active : '')}>
								Author 2
							</NavLink>
							<NavLink to="/authors/3" className={({ isActive }) => (isActive ? cls.active : '')}>
								Author 3
							</NavLink>
						</div>
					)}
				</div>

				{/* Posts Dropdown */}
				<div
					className={cls.dropdown}
					onMouseEnter={() => setPostsOpen(true)}
					onMouseLeave={() => setPostsOpen(false)}
					onClick={() => setPostsOpen(!postsOpen)}
				>
					<span className={cls.dropdown_label}>Posts</span>
					{postsOpen && (
						<div className={cls.dropdown_menu}>
							<NavLink to="/posts/1" className={({ isActive }) => (isActive ? cls.active : '')}>
								Post 1
							</NavLink>
							<NavLink to="/posts/2" className={({ isActive }) => (isActive ? cls.active : '')}>
								Post 2
							</NavLink>
							<NavLink to="/posts/3" className={({ isActive }) => (isActive ? cls.active : '')}>
								Post 3
							</NavLink>
							<NavLink to="/posts/new" className={({ isActive }) => (isActive ? cls.active : '')}>
								Create Post
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;