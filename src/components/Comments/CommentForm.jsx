import { useId, useState } from 'react';
import cls from './Comments.module.css';

const CommentForm = () => {
	const [text, setText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const textareaId = useId();

	function handleSubmit(e) {
		e.preventDefault();
		if (!text.trim()) return;

		setIsLoading(true);

		// Імітація API-запиту
		setTimeout(() => {
			console.log('Comment submitted:', text);
			setText('');
			setIsLoading(false);
		}, 1200);
	}

	const handleChange = (e) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
		setText(e.target.value);
	};

	const isDisabled = !text.trim() || isLoading;

	return (
		<div className={cls.createComment}>
			<form onSubmit={handleSubmit}>
				<label htmlFor={textareaId}>Прокоментувати</label>

				<textarea
					id={textareaId}
					value={text}
					onChange={handleChange}
					maxLength={200}
					placeholder="Напишіть коментар..."
				/>

				<div className={cls.formFooter}>
					<p className={cls.wordCount}>{text.length} / 200</p>

					<button
						type="submit"
						className={cls.submitButton}
						disabled={isDisabled}
					>
						{isLoading ? 'Надсилання…' : 'Надіслати'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
