import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useAuth } from '../../hooks/useAuth';
import { buildCommentsTree } from '../../utils/helpers';
import cls from './CommentsList.module.css';

const CommentsList = ({ comments: allComments }) => {
	const { id } = useParams();
	const postId = Number(id);
	const { isAuthenticated, user } = useAuth();

	const [comments, setComments] = useState([]);

	const [activeAction, setActiveAction] = useState(null);
	// { type: 'reply' | 'edit' | 'add', commentId: number | null }

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setComments(allComments.filter(c => c.postId === postId));
		setActiveAction(null); // ❗ скидати при зміні поста
	}, [postId, allComments]);

	const handleAdd = (parentId, text) => {
		const newComment = {
			id: Date.now(),
			postId,
			parentId,
			authorName: user?.name || 'Гість',
			authorAvatar: user?.avatar || 'https://i.pravatar.cc/50',
			content: text,
			createdAt: new Date().toISOString()
		};

		setComments(prev => [...prev, newComment]);
		setActiveAction(null);
	};

	const handleEdit = (id, text) => {
		setComments(prev =>
			prev.map(c => (c.id === id ? { ...c, content: text } : c))
		);
		setActiveAction(null);
	};

	const handleDelete = id => {
		setComments(prev =>
			prev.filter(c => c.id !== id && c.parentId !== id)
		);
		setActiveAction(null);
	};

	const tree = useMemo(() => buildCommentsTree(comments), [comments]);

	return (
		<section className={cls.wrapper}>
			<h3>Коментарі</h3>

			{tree.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					onReply={handleAdd}
					onEdit={handleEdit}
					onDelete={handleDelete}
					activeAction={activeAction}
					setActiveAction={setActiveAction}
				/>
			))}

			{isAuthenticated ? (
				activeAction?.type !== 'reply' &&
				activeAction?.type !== 'edit' && (
					<CommentForm
						onSubmit={text => handleAdd(null, text)}
						onFocus={() =>
							setActiveAction({ type: 'add', commentId: null })
						}
					/>
				)
			) : (
				<p className={cls.loginHint}>
					<Link to="/login">Увійдіть</Link>, щоб залишити коментар
				</p>
			)}
		</section>
	);
};

export default CommentsList;