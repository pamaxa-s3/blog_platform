import { useNavigate } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

const PostCreate = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const newPostId = Date.now(); // mock
    navigate(`/posts/${newPostId}`);
  };

  return <ArticleForm onSubmit={handleCreate} />;
};

export default PostCreate;