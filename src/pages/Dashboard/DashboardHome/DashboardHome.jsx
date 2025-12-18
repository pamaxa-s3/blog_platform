import cls from './DashboardHome.module.css';
import { posts } from '../../../data/mockPosts';

const DashboardHome = () => {
  const currentUserId = 1;

  const myPosts = posts.filter(p => p.authorId === currentUserId);

  const stats = {
    posts: myPosts.length,
    views: myPosts.reduce((sum, p) => sum + p.views, 0),
    comments: myPosts.reduce((sum, p) => sum + p.commentsCount, 0),
  };

  const latestComments = myPosts
    .flatMap(post =>
      (post.comments || []).map(comment => ({
        ...comment,
        postTitle: post.title,
        postId: post.id,
      }))
    )
    .slice(0, 5);

  return (
    <div className={cls.wrapper}>
      <h1>Головна</h1>

      <div className={cls.stats}>
        <div className={cls.card}>
          <span className={cls.label}>Статей</span>
          <strong>{stats.posts}</strong>
        </div>
        <div className={cls.card}>
          <span className={cls.label}>Переглядів</span>
          <strong>{stats.views}</strong>
        </div>
        <div className={cls.card}>
          <span className={cls.label}>Коментарів</span>
          <strong>{stats.comments}</strong>
        </div>
      </div>

      <section className={cls.comments}>
        <h2>Останні коментарі</h2>

        {latestComments.length === 0 ? (
          <p className={cls.empty}>Коментарів поки немає</p>
        ) : (
          <ul className={cls.list}>
            {latestComments.map(comment => (
              <li key={comment.id} className={cls.comment}>
                <div>
                  <strong>{comment.author}</strong> до статті{' '}
                  <span className={cls.post}>
                    «{comment.postTitle}»
                  </span>
                </div>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashboardHome;