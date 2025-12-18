import CommentForm from './CommentForm';
import cls from './CommentItem.module.css';
import { useAuth } from '../../hooks/useAuth';

const MAX_DEPTH = 3;

const CommentItem = ({
	comment,
	onReply,
	onEdit,
	onDelete,
	depth = 0,
	activeAction,
	setActiveAction
}) => {
	const { isAuthenticated, user } = useAuth();

	const createdAt = new Date(comment.createdAt).toLocaleString('uk-UA');

	const isReplying =
		activeAction?.type === 'reply' &&
		activeAction.commentId === comment.id;

	const isEditing =
		activeAction?.type === 'edit' &&
		activeAction.commentId === comment.id;

	const isOwner = isAuthenticated && user?.name === comment.authorName;

	return (
		<div className={cls.thread}>
			<div className={cls.comment}>
				<img
					src={comment.authorAvatar}
					alt={comment.authorName}
					className={cls.avatar}
				/>

				<div className={cls.content}>
					<div className={cls.header}>
						<strong>{comment.authorName}</strong>
						<span>{createdAt}</span>
					</div>

					{isEditing ? (
						<CommentForm
							placeholder="Редагувати коментар…"
							initialValue={comment.content}
							onSubmit={text => onEdit(comment.id, text)}
						/>
					) : (
						<p className={cls.text}>{comment.content}</p>
					)}

					<div className={cls.actions}>
						{depth < MAX_DEPTH && (
							<button
								onClick={() =>
									setActiveAction({
										type: 'reply',
										commentId: comment.id
									})
								}
								disabled={!!activeAction}
							>
								Відповісти
							</button>
						)}

						{isOwner && (
							<>
								<button
									onClick={() =>
										setActiveAction({
											type: 'edit',
											commentId: comment.id
										})
									}
									disabled={!!activeAction}
								>
									Редагувати
								</button>

								<button
									className={cls.delete}
									onClick={() => onDelete(comment.id)}
								>
									Видалити
								</button>
							</>
						)}
					</div>

					{isReplying && (
						<CommentForm
							placeholder={`Відповідь @${comment.authorName}`}
							onSubmit={text => onReply(comment.id, text)}
						/>
					)}
				</div>
			</div>

			{comment.replies?.length > 0 && (
				<div className={cls.replies}>
					{comment.replies.map(reply => (
						<CommentItem
							key={reply.id}
							comment={reply}
							onReply={onReply}
							onEdit={onEdit}
							onDelete={onDelete}
							depth={depth + 1}
							activeAction={activeAction}
							setActiveAction={setActiveAction}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CommentItem;