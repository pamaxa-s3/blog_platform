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

	return (
		<div className={cls.postCard}>
			<div className={cls.cardImage}>
				<img src={imageUrl} alt={title} />

				<div className={cls.cardContent}>
					<Link to={`/posts/${id}`} className={cls.cardTitle}>
						{title}
					</Link>

					<p className={cls.cardExcerpt}>{excerpt}</p>

					{author && (
						<Link to={`/authors/${authorId}`}>
							Автор: {author.name}
						</Link>
					)}

					{category && (
						<Link to={`/categories/${categoryId}`}>
							Категорія: {category.name}
						</Link>
					)}

					<span className={cls.cardDate}>{createdAt}</span>

					<div className={cls.cardStatistics}>
						<span>Переглядів: {views}</span>
						<span>Коментарів: {commentsCount}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
