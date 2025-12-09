import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import { authors } from "../../data/mockAuthors";
import cls from "./Header.module.css";

const Header = () => {
	const [searchValue, setSearchValue] = useState("");
	const [isAuth, setIsAuth] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const user = authors.find(author => author.id === 1);

	function handleOnChangeSearch(e) {
		setSearchValue(e.target.value);
	}

	function handleAuthChenger() {
		setIsAuth(prev => !prev);
	}

	return (
		<header className={cls.header}>
			<div className={cls.container}>
				<div className={cls.headerLeft}>
					<button
						className={`${cls.burger} ${menuOpen ? cls.open : ""}`}
						onClick={() => setMenuOpen(prev => !prev)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>

					<div className={cls.headerLogo}>Blog Platform</div>
				</div>

				<nav className={`${cls.mobileMenu} ${menuOpen ? cls.show : ""}`}>
					<Navigation />
				</nav>

				<div className={cls.searchContainer}>
					<SearchBar
						placeholder="Search..."
						value={searchValue}
						onChange={handleOnChangeSearch}
					/>
				</div>

				<div className={cls.authBlock}>
					{!isAuth ? (
						<button
							className={`${cls.authButton} ${cls.authButtonLogin}`}
							onClick={handleAuthChenger}
						>
							Увійти
						</button>
					) : (
						<div className={cls.userInfo}>
							<img
								src={user.avatar}
								alt={user.name}
								className={cls.avatar}
							/>

							<div className={cls.dropdownMenu}>
								<Link to={`/authors/${user.id}`}>Профіль</Link>
								<Link to="/settings">Налаштування</Link>
								<button
									className={`${cls.authButton} ${cls.authButtonLogout}`}
									onClick={handleAuthChenger}
								>
									Вийти
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
