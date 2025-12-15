import { useId, useState } from 'react';
import cls from './Comments.module.css';

const CommentForm = ({ onSubmit, placeholder = 'Напишіть коментар...' }) => {
	const [text, setText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const textareaId = useId();

	const handleSubmit = e => {
		e.preventDefault();
		if (!text.trim()) return;

		setIsLoading(true);

		setTimeout(() => {
			onSubmit(text);
			setText('');
			setIsLoading(false);
		}, 600);
	};

	return (
		<div className={cls.createComment}>
			<form onSubmit={handleSubmit}>
				<textarea
					id={textareaId}
					value={text}
					onChange={e => setText(e.target.value)}
					maxLength={200}
					placeholder={placeholder}
				/>

				<div className={cls.formFooter}>
					<p>{text.length} / 200</p>
					<button disabled={!text.trim() || isLoading}>
						{isLoading ? 'Надсилання…' : 'Надіслати'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
