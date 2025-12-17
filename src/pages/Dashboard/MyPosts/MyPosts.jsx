import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { posts } from '../../../data/mockPosts';
import cls from './MyPosts.module.css';

const MyPosts = () => {
  const navigate = useNavigate();

  // тимчасово — поточний користувач
  const currentUserId = 1;

  const [filter, setFilter] = useState('all');

  const myPosts = useMemo(() => {
    return posts.filter(p => p.authorId === currentUserId);
  }, []);

  const filteredPosts = useMemo(() => {
    if (filter === 'published') {
      return myPosts.filter(p => p.status === 'published');
    }
    if (filter === 'draft') {
      return myPosts.filter(p => p.status === 'draft');
    }
    return myPosts;
  }, [filter, myPosts]);

  const handleDelete = id => {
    const confirmed = window.confirm('Видалити статтю?');
    if (!confirmed) return;

    // тут пізніше буде API
    console.log('delete post', id);
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.header}>
        <h1>Мої статті</h1>
        <Link to="/posts/new" className={cls.create}>
          + Нова стаття
        </Link>
      </div>

      <div className={cls.filters}>
        <button
          className={filter === 'all' ? cls.active : ''}
          onClick={() => setFilter('all')}
        >
          Всі
        </button>
        <button
          className={filter === 'published' ? cls.active : ''}
          onClick={() => setFilter('published')}
        >
          Опубліковані
        </button>
        <button
          className={filter === 'draft' ? cls.active : ''}
          onClick={() => setFilter('draft')}
        >
          Чернетки
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <p className={cls.empty}>У вас ще немає статей</p>
      ) : (
        <table className={cls.table}>
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Дата</th>
              <th>Перегляди</th>
              <th>Коментарі</th>
              <th>Статус</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td className={cls.title}>{post.title}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>{post.views}</td>
                <td>{post.commentsCount}</td>
                <td>
                  <span
                    className={
                      post.status === 'published'
                        ? cls.published
                        : cls.draft
                    }
                  >
                    {post.status === 'published'
                      ? 'Опубліковано'
                      : 'Чернетка'}
                  </span>
                </td>
                <td className={cls.actions}>
                  <Link to={`/posts/${post.id}`}>Переглянути</Link>
                  <Link to={`/posts/${post.id}/edit`}>Редагувати</Link>
                  <button onClick={() => handleDelete(post.id)}>
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPosts;