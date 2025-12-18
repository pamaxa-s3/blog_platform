import {
	useParams,
	NavLink,
	Outlet,
	useLocation,
	useNavigate
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authors } from '../../data/mockAuthors';
import AuthorLayoutSkeleton from './AuthorLayoutSkeleton';
import cls from './AuthorLayout.module.css';

const AuthorLayout = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [author, setAuthor] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLoading(true);

		const timer = setTimeout(() => {
			const found = authors.find(a => a.id === Number(id));
			setAuthor(found);
			setLoading(false);
		}, 600); // імітація API

		return () => clearTimeout(timer);
	}, [id]);

	if (loading) return <AuthorLayoutSkeleton />;
	if (!author) return <p>Автор не знайдений</p>;

	return (
		<section className={cls.authorPage}>
			<header className={cls.header}>
				<img src={author.avatar} className={cls.avatar} />
				<div className={cls.info}>
					<h1>{author.name}</h1>
					<p>{author.bio}</p>

					<div className={cls.stats}>
						<span>Статей: {author.postsCount}</span>
						<span>Коментарів: {author.commentsCount}</span>
						<span>Підписників: {author.followers}</span>
					</div>
				</div>
			</header>

			<nav className={cls.nav}>
				<div className={cls.tabs}>
					<NavLink
						to="posts"
						className={({ isActive }) =>
							isActive ? cls.active : ''
						}
					>
						Статті
					</NavLink>

					<NavLink
						to="about"
						className={({ isActive }) =>
							isActive ? cls.active : ''
						}
					>
						Про автора
					</NavLink>
				</div>

				<select
					className={cls.mobileSelect}
					value={
						location.pathname.includes('/about') ? 'about' : 'posts'
					}
					onChange={e => navigate(e.target.value)}
				>
					<option value="posts">Статті</option>
					<option value="about">Про автора</option>
				</select>
			</nav>

			<div className={cls.content}>
				<Outlet context={{ author }} />
			</div>
		</section>
	);
};

export default AuthorLayout;
