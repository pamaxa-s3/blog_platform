import { useState, useEffect } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import cls from './Comments.module.css';

const CommentItem = ({ comment, allComments, level = 0, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(comment.content);
	const [showConfirm, setShowConfirm] = useState(false);

	// Відповіді до коментаря
	const replies = allComments.filter(c => c.parentId === comment.id);

	// 🔄 Скидання тексту при відкритті edit-mode або cancel
	useEffect(() => {
		if (isEditing) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setText(comment.content);
		}
	}, [isEditing, comment.content]);

	const handleSave = () => {
		if (!text.trim()) return;
		onEdit(comment.id, text);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setText(comment.content); // ⬅️ скидання
	};

	const handleDeleteConfirm = () => {
		onDelete(comment.id);
		setShowConfirm(false);
	};

	return (
		<>
			<div className={cls.comment} style={{ marginLeft: level * 20 }}>
				<strong>{comment.authorName}</strong>

				{isEditing ? (
					<textarea
						value={text}
						onChange={e => setText(e.target.value)}
						className={cls.editTextarea}
					/>
				) : (
					<p>{comment.content}</p>
				)}

				<div className={cls.actions}>
					{isEditing ? (
						<>
							<button onClick={handleCancel}>Скасувати</button>
							<button onClick={handleSave}>Зберегти</button>
						</>
					) : (
						<button onClick={() => setIsEditing(true)}>Редагувати</button>
					)}

					<button
						className={cls.delete}
						onClick={() => setShowConfirm(true)}
					>
						Видалити
					</button>
				</div>

				{/* Вкладені коментарі */}
				{replies.length > 0 && (
					<div className={cls.replies}>
						{replies.map(reply => (
							<CommentItem
								key={reply.id}
								comment={reply}
								allComments={allComments}
								level={level + 1}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						))}
					</div>
				)}
			</div>

			{/* Confirm modal для видалення */}
			{showConfirm && (
				<ConfirmModal
					title="Видалити коментар?"
					message="Коментар і всі відповіді буде видалено без можливості відновлення."
					onConfirm={handleDeleteConfirm}
					onCancel={() => setShowConfirm(false)}
				/>
			)}
		</>
	);
};

export default CommentItem;