import { Link, useLocation, useParams } from 'react-router-dom';
import { authors } from '../../data/mockAuthors';
import { posts } from '../../data/mockPosts';
import cls from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
	const { id } = useParams();
	const location = useLocation();

	const author = authors.find(a => a.id === Number(id));
	const segments = location.pathname.split('/').filter(Boolean);

	const getSegmentName = (segment, index) => {
		if (segment === 'authors') return 'Authors';

		// author id → name (тільки другий сегмент)
		if (index === 1 && segment === id && author) return author.name;

		if (segment === 'posts') return 'Статті';
		if (segment === 'about') return 'Про автора';

		// post id → title
		const post = posts.find(p => p.id === Number(segment));
		if (post) return post.title;

		return segment;
	};

	return (
		<nav className={cls.wrapper}>
			<div className={cls.breadcrumbs}>
				{/* Головна */}
				<Link to="/" className={cls.link}>Головна</Link>

				{segments.map((segment, index) => {
					const path = '/' + segments.slice(0, index + 1).join('/');
					const isLast = index === segments.length - 1;

					return (
						<span key={index} className={cls.item}>
							<span className={cls.separator}>/</span>

							{isLast ? (
								<span className={cls.current}>
									{getSegmentName(segment, index)}
								</span>
							) : (
								<Link to={path} className={cls.link}>
									{getSegmentName(segment, index)}
								</Link>
							)}
						</span>
					);
				})}
			</div>
		</nav>
	);
};

export default Breadcrumbs;