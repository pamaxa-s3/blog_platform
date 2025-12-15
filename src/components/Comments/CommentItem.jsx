import { useState } from 'react';
import CommentForm from './CommentForm';
import cls from './Comments.module.css';

const CommentItem = ({ comment, onReply, onEdit, onDelete }) => {
	const [replyOpen, setReplyOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editText, setEditText] = useState(comment.content);

	const date = new Date(comment.createdAt).toLocaleString('uk-UA');
	const isDeleted = comment.isDeleted;

	return (
		<div className={cls.comment}>
			{/* Автор та аватар */}
			<div className={cls.authorInfo}>
				<div className={cls.avatar}>
					<img src={comment.authorAvatar} alt={comment.authorName} />
				</div>
				<div className={cls.name}>{comment.authorName}</div>
			</div>

			{/* Контент */}
			{editOpen ? (
				<>
					<textarea
						className={cls.editTextarea}
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					/>
					<div className={cls.actions}>
						<button
							onClick={() => {
								onEdit(comment.id, editText);
								setEditOpen(false);
							}}
						>
							Зберегти
						</button>
						<button onClick={() => setEditOpen(false)}>Скасувати</button>
					</div>
				</>
			) : (
				<p className={isDeleted ? cls.deleted : cls.content}>
					{comment.content}
					{comment.isEdited && !isDeleted && (
						<span className={cls.edited}>(ред.)</span>
					)}
				</p>
			)}

			{/* Дата */}
			<span className={cls.dateCreated}>{date}</span>

			{/* Дії */}
			{!isDeleted && (
				<div className={cls.actions}>
					<button onClick={() => setReplyOpen((p) => !p)}>Відповісти</button>
					<button onClick={() => setEditOpen(true)}>Редагувати</button>
					<button className={cls.delete} onClick={() => onDelete(comment.id)}>
						Видалити
					</button>
				</div>
			)}

			{/* Форма відповіді */}
			{replyOpen && (
				<CommentForm
					placeholder="Ваша відповідь..."
					onSubmit={(text) => {
						onReply(text, comment.id);
						setReplyOpen(false);
					}}
				/>
			)}

			{/* Відповіді */}
			{comment.replies?.length > 0 && (
				<div className={cls.replies}>
					{comment.replies.map((reply) => (
						<CommentItem
							key={reply.id}
							comment={reply}
							onReply={onReply}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CommentItem;
