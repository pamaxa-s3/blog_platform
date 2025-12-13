import { useParams, Link } from 'react-router-dom';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useAuth } from '../../hooks/useAuth';
import cls from './Comments.module.css';

const CommentsList = ({ comments }) => {
	const params = useParams();
	const { isAuthenticated } = useAuth();

	return (
		<div className={cls.commentsList}>
			{comments
				.filter(comment => Number(params.id) === comment.postId)
				.map(comment => (
					<CommentItem key={comment.id} comment={comment} />
				))}

			{isAuthenticated && <CommentForm />}
			{!isAuthenticated && (
				<p style={{ marginTop: 12, fontStyle: 'italic', color: '#666' }}>
					Щоб залишити коментар, будь ласка, <Link to='/login' style={{ color: '#2563eb' }}>увійдіть</Link>.
				</p>
			)}
		</div>
	);
};

export default CommentsList;
