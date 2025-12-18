import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';
import { comments as allComments } from '../../data/mockComments';

import CommentsList from '../../components/Comments/CommentsList';
import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';
import cls from './PostDetail.module.css';

const PostDetail = () => {
	const { id } = useParams();
	const postId = Number(id);

	const post = posts.find(p => p.id === postId);


	const [comments, setComments] = useState([]);


	useEffect(() => {
		const postComments = allComments.filter(
			comment => comment.postId === postId
		);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setComments(postComments);
	}, [postId]);


	const handleDeleteComment = (commentId) => {
		setComments(prev =>
			prev.filter(
				c => c.id !== commentId && c.parentId !== commentId
			)
		);
	};


	const handleEditComment = (commentId, newText) => {
		setComments(prev =>
			prev.map(c =>
				c.id === commentId
					? { ...c, content: newText }
					: c
			)
		);
	};

	if (!post) return <p>Пост не знайдено</p>;

	const author = authors.find(a => a.id === post.authorId);
	const category = categories.find(c => c.id === post.categoryId);
	const createdAt = new Date(post.createdAt).toLocaleString('uk-UA');

	return (
		<section className={cls.post}>
			<main>
				<h3>{post.title}</h3>


				<div className={cls.meta}>
					{author && (
						<span>
							Автор:{' '}
							<Link to={`/authors/${author.id}`}>
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

					<span className={cls.cardDate}>{createdAt}</span>
					<span className={cls.cardViews}>👁 {post.views}</span>
				</div>


				{post.imageUrl && (
					<div className={cls.image}>
						<img src={post.imageUrl} alt={post.title} />
					</div>
				)}


				<p className={cls.text}>{post.content}</p>


				{post.tags?.length > 0 && (
					<div className={cls.tags}>
						{post.tags.map(tag => (
							<Link key={tag} to={`#${tag}`}>
								#{tag}
							</Link>
						))}
					</div>
				)}


				<div className={cls.comments}>
					<CommentsList
						comments={comments}
						onDelete={handleDeleteComment}
						onEdit={handleEditComment}
					/>
				</div>


				<RelatedPosts
					currentPost={post}
					allPosts={posts}
				/>
			</main>
		</section>
	);
};

export default PostDetail;