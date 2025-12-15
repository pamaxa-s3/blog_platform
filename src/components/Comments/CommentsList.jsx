import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useAuth } from '../../hooks/useAuth';
import cls from './Comments.module.css';

// Функція для побудови дерева коментарів
const buildTree = (comments) => {
	const map = {};
	const roots = [];

	// створюємо map
	comments.forEach(c => {
		map[c.id] = { ...c, replies: [] };
	});

	comments.forEach(c => {
		const parent = map[c.parentId];

		// вкладений ТІЛЬКИ якщо parent існує і postId співпадає
		if (
			c.parentId !== null &&
			parent &&
			parent.postId === c.postId
		) {
			parent.replies.push(map[c.id]);
		} else {
			// кореневий коментар
			roots.push(map[c.id]);
		}
	});

	// Сортування по даті (опціонально)
	roots.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
	Object.values(map).forEach(c =>
		c.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
	);

	return roots;
};

const CommentsList = ({ comments: initialComments }) => {
	const { id } = useParams();
	const { isAuthenticated } = useAuth();

	const [comments, setComments] = useState(
		initialComments.filter(c => c.postId === Number(id))
	);

	// Додаємо новий коментар або відповідь
	const handleAddComment = (text, parentId = null) => {
		setComments(prev => [
			...prev,
			{
				id: Date.now(),
				postId: Number(id),
				authorName: 'Ви',
				authorAvatar: 'https://i.pravatar.cc/50',
				content: text,
				createdAt: new Date().toISOString(),
				parentId
			}
		]);
	};

	// Редагування коментаря
	const handleEditComment = (id, newText) => {
		setComments(prev =>
			prev.map(c =>
				c.id === id ? { ...c, content: newText, isEdited: true } : c
			)
		);
	};

	// Видалення (soft delete)
	const handleDeleteComment = (id) => {
		setComments(prev =>
			prev.map(c =>
				c.id === id ? { ...c, content: '[Коментар видалено]', isDeleted: true } : c
			)
		);
	};

	const tree = useMemo(() => buildTree(comments), [comments]);

	return (
		<div className={cls.commentsList}>
			{tree.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					onReply={handleAddComment}
					onEdit={handleEditComment}
					onDelete={handleDeleteComment}
				/>
			))}

			{isAuthenticated && (
				<CommentForm onSubmit={(text) => handleAddComment(text)} />
			)}

			{!isAuthenticated && (
				<p className={cls.loginHint}>
					Щоб залишити коментар, <Link to="/login">увійдіть</Link>
				</p>
			)}
		</div>
	);
};

export default CommentsList;
