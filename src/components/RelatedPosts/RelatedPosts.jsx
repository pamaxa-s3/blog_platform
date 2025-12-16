import { Link } from 'react-router-dom';
import cls from './RelatedPosts.module.css';
import LazyImage from '../common/LazyImage/LazyImage';

const RelatedPosts = ({ currentPost, allPosts }) => {
	if (!currentPost) return null;

	const related = allPosts
		.filter(
			post =>
				post.id !== currentPost.id &&
				(post.category === currentPost.category ||
					post.tags?.some(tag => currentPost.tags?.includes(tag)))
		)
		.slice(0, 3);

	if (!related.length) return null;

	return (
		<section className={cls.relatedPosts}>
			<h3 className={cls.title}>Схожі статті</h3>

			<div className={cls.grid}>
				{related.map(post => (
					<Link
						key={post.id}
						to={`/posts/${post.id}`}
						className={cls.card}
					>
						<div className={cls.imageWrapper}>
							<LazyImage
								src={post.imageUrl}
								alt={post.title}
							/>
						</div>

						<div className={cls.content}>
							<h4 className={cls.cardTitle}>{post.title}</h4>
							<p className={cls.excerpt}>{post.excerpt}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default RelatedPosts;