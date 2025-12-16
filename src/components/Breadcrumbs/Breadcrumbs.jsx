import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { authors } from '../../data/mockAuthors';
import { posts } from '../../data/mockPosts';
import cls from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	const segments = location.pathname.split('/').filter(Boolean);

	const handleComeBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate('/');
		}
	};

	const getSegmentName = (segment, index) => {
		// Статичні сторінки
		if (segment === 'authors') return 'Authors';
		if (segment === 'posts') return 'Статті';
		if (segment === 'about') return 'Про автора';

		const numericId = Number(segment);
		if (!isNaN(numericId)) {
			// Якщо попередній сегмент authors → це автор
			if (segments[index - 1] === 'authors') {
				const author = authors.find(a => a.id === numericId);
				return author ? author.name : segment;
			}

			// Якщо попередній сегмент posts → це пост
			if (segments[index - 1] === 'posts' || (segments[index - 2] === 'authors' && segments[index - 1] === id)) {
				const post = posts.find(p => p.id === numericId);
				return post ? post.title : segment;
			}
		}

		// fallback
		return segment;
	};

	return (
		<nav className={cls.wrapper}>
			<div className={cls.breadcrumbs}>
				<Link to="/" className={cls.link}>Головна</Link>

				{segments.map((segment, index) => {
					const path = '/' + segments.slice(0, index + 1).join('/');
					const isLast = index === segments.length - 1;

					return (
						<span key={index} className={cls.item}>
							<span className={cls.separator}>/</span>
							{isLast ? (
								<span className={cls.current}>{getSegmentName(segment, index)}</span>
							) : (
								<Link to={path} className={cls.link}>{getSegmentName(segment, index)}</Link>
							)}
						</span>
					);
				})}
			</div>

			<button onClick={handleComeBack}>⬅️ Назад</button>
		</nav>
	);
};

export default Breadcrumbs;
