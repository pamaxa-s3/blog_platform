import PostList from '../../components/PostList/PostList';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';
import cls from './Home.module.css';

const Home = () => {
  return (
    <div className={cls.home}>
      <div className={cls.sectionHeader}>
        <h2 className={cls.sectionTitle}>Останні пости</h2>
        <span className={cls.sectionSub}>{posts.length} публікацій</span>
      </div>

      <div className={cls.postsGrid}>
        <PostList
          posts={posts}
          authors={authors}
          categories={categories}
        />
      </div>

      <button className={cls.loadMore}>Показати більше</button>
    </div>
  );
};

export default Home;