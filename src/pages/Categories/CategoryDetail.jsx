import { useParams } from 'react-router-dom';
import { posts } from '../../data/mockPosts';
import { categories } from '../../data/mockCategories';
import { authors } from '../../data/mockAuthors';
import PostCard from '../../components/PostCard/PostCard';
import cls from './CategoryDetail.module.css';

const CategoryDetail = () => {
  const { slug } = useParams();

  const category = categories.find(cat => cat.slug === slug);

  if (!category) return <h2>Категорія не знайдена</h2>;

  const categoryPosts = posts.filter(post => post.categoryId === category.id) || [];

  return (
    <section className={cls.category}>
      <header className={cls.header}>
        <h2>{category.name}</h2>
        <p>{category.description}</p>
        <span className={cls.count}>{categoryPosts.length} статей</span>
      </header>

      <div className={cls.postsGrid}>
        {categoryPosts.length > 0 ? (
          categoryPosts.map(post => (
            <PostCard
              key={post.id}
              postData={post}
              authors={authors}
              categories={categories}
            />
          ))
        ) : (
          <p>Статей ще немає.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryDetail;