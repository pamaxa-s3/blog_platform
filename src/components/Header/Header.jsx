import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import { useAuth } from '../../hooks/useAuth';
import cls from './Header.module.css';

const Header = () => {
	const [searchValue, setSearchValue] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();

	const handleLogin = () => {
		navigate('/login');
	};

	const handleLogout = () => {
		logout();
		navigate('/', { replace: true });
	};

	return (
		<header className={cls.header}>
			<div className={cls.container}>
				{/* LEFT */}
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

				{/* DESKTOP NAV */}
				<div className={cls.desktopNav}>
					<Navigation />
				</div>

				{/* SEARCH */}
				<div className={cls.searchContainer}>
					<SearchBar
						placeholder="Пошук…"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
						onSubmit={() => setSearchValue('')}
					/>
				</div>

				{/* AUTH */}
				<div className={cls.authBlock}>
					{!isAuthenticated ? (
						<button
							className={`${cls.authButton} ${cls.authButtonLogin}`}
							onClick={handleLogin}
						>
							Увійти
						</button>
					) : (
						<div className={cls.userInfo}>
							<img
								src={user.avatar || 'https://i.pravatar.cc/40'}
								alt={user.name}
								className={cls.avatar}
							/>

							<div className={cls.dropdownMenu}>
								{/* ✅ ПРАВИЛЬНО */}
								<Link to="/dashboard">Мій профіль</Link>
								<Link to="/dashboard/settings">
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

				{/* MOBILE MENU */}
				<nav
					className={`${cls.mobileMenu} ${menuOpen ? cls.show : ''}`}
				>
					<Navigation onNavigate={() => setMenuOpen(false)} />
				</nav>
			</div>
		</header>
	);
};

export default Header;