import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { posts } from '../../data/mockPosts';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

const PostEdit = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));

  if (!post) return <Navigate to="/404" />;
  if (post.authorId !== currentUser.id) return <Navigate to="/" />;

  const handleUpdate = data => {
    navigate(`/posts/${post.id}`);
  };

  const handleDelete = () => {
    navigate('/dashboard/my-posts');
  };

  return (
    <ArticleForm
      initialData={post}
      isEdit
      onSubmit={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default PostEdit;