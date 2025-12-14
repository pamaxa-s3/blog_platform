import { useParams, Link } from 'react-router-dom';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';
import { comments } from '../../data/mockComments';
import cls from './PostDetail.module.css';
import CommentsList from '../../components/Comments/CommentsList'
import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';



const PostDetail = () => {
	const { id } = useParams();

	// Порівнюємо число з числом
	const postId = Number(id);
	const post = posts.find(post => post.id === postId);

	if (!post) {
		return <h2>Пост не знайдено</h2>;
	}

	const author = authors.find(author => author.id === post.authorId);
	const category = categories.find(
		category => category.id === post.categoryId
	);

	const dateCreatedAt = new Date(post.createdAt).toLocaleString('uk-UA');

	return (
		<section className={cls.post}>
			<main>
				<h3>{post.title}</h3>

				<div className={cls.meta}>
					{author && (
						<span>
							Автор:{' '}
							<Link to={`/authors/${post.authorId}`}>
								{author.name}
							</Link>
						</span>
					)}

					{category && (
						<span>
							Категорія:{' '}
							<Link to={`/categories/${post.categoryId}`}>
								{category.name}
							</Link>
						</span>
					)}

					<span className={cls.cardDate}>{dateCreatedAt}</span>
					<span className={cls.cardViews}>👁 {post.views}</span>
				</div>

				{post.imageUrl && (
					<div className={cls.image}>
						<img src={post.imageUrl} alt={post.title} />
					</div>
				)}

				<p className={cls.text}>{post.content}</p>

				<div className={cls.tags}>
					{post.tags?.map(tag => (
						<Link key={tag} to={`#${tag}`}>
							#{tag}
						</Link>
					))}
				</div>

				{/* Тут можна буде додати кнопку "Редагувати" */}
			</main>
			<div className={cls.comments}>
				<CommentsList comments={comments} />
			</div>

			<RelatedPosts currentPost={post} allPosts={posts} />


		</section>
	);
};

export default PostDetail;
