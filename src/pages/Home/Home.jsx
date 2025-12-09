import PostList from '../../components/PostList/PostList';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';
import cls from './Home.module.css';

const Home = () => {
	return (
		<div className={cls.home}>
			<PostList posts={posts} authors={authors} categories={categories} />
		</div>
	);
};

export default Home;
