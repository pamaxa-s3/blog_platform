import CommentForm from './CommentForm';
import cls from './Comments.module.css';

const CommentItem = ({ comment }) => {
	const dateCreateAt = new Date(comment.createdAt).toLocaleString("uk-UA");
	return (
		<div className={cls.comment}>
			<div className={cls.authorInfo}>
				<div className={cls.avatar}>
					<img src={comment.authorAvatar} alt={comment.authorName} />
				</div>
				<div className={cls.name}>{comment.authorName}</div>
			</div>
			<p className={cls.content}>{comment.content}</p>
			<span className={cls.dateCreated}>{dateCreateAt}</span>

		</div>
	);
};

export default CommentItem;
