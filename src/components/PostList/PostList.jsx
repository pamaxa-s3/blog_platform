import PostCard from '../PostCard/PostCard';
import cls from './PostList.module.css';

const PostList = ({ posts = [], authors = [], categories = [] }) => {

	if (!posts.length) {
		return <p className={cls.empty}>Пости не знайдені...</p>;
	}

	return (
		<div className={cls.postList}>
			{posts.map(post => (
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

export default PostList;