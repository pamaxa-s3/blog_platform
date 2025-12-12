import {useParams} from 'react-router-dom'
import CommentItem from './CommentItem'
import cls from './Comments.module.css';

const CommentsList = ({ comments }) => {
	const params = useParams();
	return (
		<div className={cls.commentsList}>
			{comments.map(comment => {
	if (Number(params.id) === comment.postId){
				return <CommentItem key={comment.id} comment={comment} />;
	}
			  
			})}
		</div>
	);
};

export default CommentsList;
