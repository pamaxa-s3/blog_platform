import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import { useAuth } from '../../hooks/useAuth';
import cls from './Header.module.css';

const Header = () => {
	const [searchValue, setSearchValue] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);
	const { search } = useLocation();

	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleOnChangeSearch = e => {
		setSearchValue(e.target.value);
	};

	const handleLogin = () => {
		navigate('/login');
	};

	const handleLogout = () => {
		logout();
		navigate(`/${search}`, { replace: true });
	};

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

					<Link to={`/${search}`} className={cls.headerLogo}>
						Blog Platform
					</Link>
				</div>

				{/* ✅ DESKTOP NAV */}
				<div className={cls.desktopNav}>
					<Navigation />
				</div>

				<div className={cls.searchContainer}>
					<SearchBar
						placeholder="Search..."
						value={searchValue}
						onChange={handleOnChangeSearch}
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
						<div className={cls.userInfo}>
							<img
								src={user.avatar || 'https://i.pravatar.cc/40'}
								alt={user.name}
								className={cls.avatar}
							/>

							<div className={cls.dropdownMenu}>
								<Link to={`/authors/${user.id}`}>Профіль</Link>
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
				{/* ✅ MOBILE MENU */}
				<nav
					className={`${cls.mobileMenu} ${menuOpen ? cls.show : ''}`}
				>
					<Navigation />
				</nav>
			</div>
		</header>
	);
};

export default Header;
