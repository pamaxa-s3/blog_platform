import { Link } from 'react-router-dom';
import cls from './PostCard.module.css';

const PostCard = ({
	postData: {
		id,
		title,
		imageUrl,
		excerpt,
		authorId,
		categoryId,
		createdAt,
		views,
		commentsCount
	},
	authors,
	categories
}) => {
	const author = authors.find(a => a.id === authorId);
	const category = categories.find(c => c.id === categoryId);
	const dateCreateAt = new Date(createdAt).toLocaleString('uk-UA');

	return (
		<div className={cls.postCard}>
			<Link to={`/posts/${id}`} className={cls.imageWrapper}>
				<img src={imageUrl} alt={title} />
			</Link>

			<div className={cls.cardContent}>
				<Link to={`/posts/${id}`} className={cls.cardTitle}>
					{title}
				</Link>

				<p className={cls.cardExcerpt}>{excerpt}</p>

				<div className={cls.meta}>
					{author && (
						<span>
							Автор:{' '}
							<Link to={`/authors/${authorId}`}>
								{author.name}
							</Link>
						</span>
					)}

					{category && (
						<span>
							Категорія:{' '}
							<Link to={`/categories/${category.slug}`}>
								{category.name}
							</Link>
						</span>
					)}
				</div>

				<span className={cls.cardDate}>{dateCreateAt}</span>

				<div className={cls.cardStatistics}>
					<span>👁 {views}</span>
					<span>💬 {commentsCount}</span>
				</div>
			</div>
		</div>
	);
};

export default PostCard;