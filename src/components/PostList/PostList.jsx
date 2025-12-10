import PostCard from '../PostCard/PostCard';

const PostList = ({ posts, authors, categories }) => {
  return posts.map(post => (
    <PostCard
      key={post.id}
      postData={post}
      authors={authors}
      categories={categories}
    />
  ));
};

export default PostList;