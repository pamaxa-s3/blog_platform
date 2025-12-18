import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import { useAuth } from '../../hooks/useAuth';
import cls from './Header.module.css';

const Header = () => {
	const [searchValue, setSearchValue] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dropdownRef = useRef(null);

	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();

	const handleLogin = () => navigate('/login');

	const handleLogout = () => {
		logout();
		setDropdownOpen(false);
		navigate('/', { replace: true });
	};

	useEffect(() => {
		const handleClickOutside = e => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target)
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header className={cls.header}>
			<div className={cls.container}>
				<div className={cls.headerLeft}>
					<button
						className={`${cls.burger} ${menuOpen ? cls.open : ''}`}
						onClick={() => setMenuOpen(prev => !prev)}
					>
						<span />
						<span />
						<span />
					</button>

					<Link to="/" className={cls.headerLogo}>
						Blog Platform
					</Link>
				</div>

				<div className={cls.desktopNav}>
					<Navigation />
				</div>

				<div className={cls.searchContainer}>
					<SearchBar
						placeholder="Пошук…"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
						onSubmit={() => setSearchValue('')}
					/>
				</div>

				<div className={cls.authBlock}>
					{!isAuthenticated ? (
						<button
							className={`${cls.authButton} ${cls.authButtonLogin}`}
							onClick={handleLogin}
						>
							Увійти
						</button>
					) : (
						<div
							className={cls.userInfo}
							ref={dropdownRef}
						>
							<img
								src={user.avatar || 'https://i.pravatar.cc/40'}
								alt={user.name}
								className={cls.avatar}
								onClick={() =>
									setDropdownOpen(prev => !prev)
								}
							/>

							<div
								className={`${cls.dropdownMenu} ${dropdownOpen ? cls.show : ''
									}`}
							>
								<Link
									to="/dashboard"
									onClick={() => setDropdownOpen(false)}
								>
									Мій профіль
								</Link>

								<Link
									to="/dashboard/settings"
									onClick={() => setDropdownOpen(false)}
								>
									Налаштування
								</Link>

								<button
									className={`${cls.authButton} ${cls.authButtonLogout}`}
									onClick={handleLogout}
								>
									Вийти
								</button>
							</div>
						</div>
					)}
				</div>

				<nav
					className={`${cls.mobileMenu} ${menuOpen ? cls.show : ''
						}`}
				>
					<Navigation onNavigate={() => setMenuOpen(false)} />
				</nav>
			</div>
		</header>
	);
};

export default Header;
