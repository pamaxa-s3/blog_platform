import CommentItem from './CommentItem';
import cls from './Comments.module.css';

const CommentsList = ({ comments, onDelete, onEdit }) => {
	if (!comments.length) {
		return <p className={cls.empty}>Коментарів поки немає</p>;
	}

	const rootComments = comments.filter(
		comment => comment.parentId === null
	);

	return (
		<div className={cls.commentsList}>
			{rootComments.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					allComments={comments}
					level={0}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	);
};

export default CommentsList;