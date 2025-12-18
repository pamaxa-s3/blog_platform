import { useEffect, useState } from 'react';
import cls from './CommentForm.module.css';

const CommentForm = ({
	onSubmit,
	placeholder = 'Ваш коментар…',
	initialValue = '',
	onFocus
}) => {
	const [text, setText] = useState(initialValue);

	useEffect(() => {
		setText(initialValue);
	}, [initialValue]);

	const handleSubmit = e => {
		e.preventDefault();
		if (!text.trim()) return;

		onSubmit(text.trim());
		setText('');
	};

	return (
		<form className={cls.form} onSubmit={handleSubmit}>
			<textarea
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder={placeholder}
				rows={3}
				onFocus={onFocus}
			/>
			<button type="submit">Надіслати</button>
		</form>
	);
};

export default CommentForm;