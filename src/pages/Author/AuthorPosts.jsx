import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';
import PostCard from '../../components/PostCard/PostCard';
import PostCardSkeleton from '../../components/PostCard/PostCardSkeleton';
import cls from './AuthorPosts.module.css';

const AuthorPosts = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	const authorPosts = posts.filter(
		post => post.authorId === Number(id)
	);

	useEffect(() => {
		const t = setTimeout(() => setLoading(false), 600);
		return () => clearTimeout(t);
	}, [id]);

	if (loading) {
		return (
			<div className={cls.postsGrid}>
				{Array.from({ length: 6 }).map((_, i) => (
					<PostCardSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className={cls.postsGrid}>
			{authorPosts.map(post => (
				<PostCard
					key={post.id}
					postData={post}
					authors={authors}
					categories={categories}
				/>
			))}
		</div>
	);
};

export default AuthorPosts;