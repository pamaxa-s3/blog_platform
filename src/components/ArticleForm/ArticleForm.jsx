import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './ArticleForm.module.css';

const EMPTY_FORM = {
	title: '',
	excerpt: '',
	content: '',
	category: '',
	tags: '',
	imageUrl: ''
};

const ArticleForm = ({
	initialData = null,
	onSubmit,
	onDelete,
	isEdit = false
}) => {
	const navigate = useNavigate();
	const [form, setForm] = useState(EMPTY_FORM);
	const [errors, setErrors] = useState({});
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (initialData) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setForm({
				title: initialData.title || '',
				excerpt: initialData.excerpt || '',
				content: initialData.content || '',
				category: initialData.category || '',
				tags: initialData.tags?.join(', ') || '',
				imageUrl: initialData.imageUrl || ''
			});
		}
	}, [initialData]);

	const validate = () => {
		const newErrors = {};

		if (!form.title.trim()) newErrors.title = 'Заголовок обовʼязковий';
		if (!form.excerpt.trim())
			newErrors.excerpt = 'Короткий опис обовʼязковий';
		if (!form.content.trim())
			newErrors.content = 'Текст статті обовʼязковий';
		if (!form.category) newErrors.category = 'Оберіть категорію';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
		setIsDirty(true);
	};

	const handleSubmit = status => {
		if (!validate()) return;

		const preparedData = {
			...form,
			tags: form.tags
				.split(',')
				.map(t => t.trim())
				.filter(Boolean),
			status
		};

		onSubmit(preparedData);
		setIsDirty(false);
	};

	const handleCancel = () => {
		if (isDirty) {
			const confirmLeave = window.confirm(
				'Є незбережені зміни. Ви впевнені, що хочете вийти?'
			);
			if (!confirmLeave) return;
		}
		navigate(-1);
	};

	const handleDelete = () => {
		const confirmed = window.confirm(
			'Видалити статтю без можливості відновлення?'
		);
		if (confirmed) {
			onDelete();
		}
	};

	return (
		<form className={cls.form} onSubmit={e => e.preventDefault()}>
			<h2>{isEdit ? 'Редагування статті' : 'Нова стаття'}</h2>

			<div className={cls.field}>
				<label>Заголовок *</label>
				<input
					name="title"
					value={form.title}
					onChange={handleChange}
				/>
				{errors.title && <span>{errors.title}</span>}
			</div>

			<div className={cls.field}>
				<label>Короткий опис *</label>
				<textarea
					name="excerpt"
					value={form.excerpt}
					onChange={handleChange}
				/>
				{errors.excerpt && <span>{errors.excerpt}</span>}
			</div>

			<div className={cls.field}>
				<label>Повний текст *</label>
				<textarea
					name="content"
					rows="8"
					value={form.content}
					onChange={handleChange}
				/>
				{errors.content && <span>{errors.content}</span>}
			</div>

			<div className={cls.field}>
				<label>Категорія *</label>
				<select
					name="category"
					value={form.category}
					onChange={handleChange}
				>
					<option value="">Оберіть</option>
					<option value="react">React</option>
					<option value="js">JavaScript</option>
					<option value="css">CSS</option>
				</select>
				{errors.category && <span>{errors.category}</span>}
			</div>

			<div className={cls.field}>
				<label>Теги (через кому)</label>
				<input name="tags" value={form.tags} onChange={handleChange} />
			</div>

			<div className={cls.field}>
				<label>URL зображення</label>
				<input
					name="imageUrl"
					value={form.imageUrl}
					onChange={handleChange}
				/>
			</div>

			<div className={cls.actions}>
				<button type="button" onClick={() => handleSubmit('published')}>
					Опублікувати
				</button>

				<button type="button" onClick={() => handleSubmit('draft')}>
					Зберегти чернетку
				</button>

				<button type="button" onClick={handleCancel}>
					Скасувати
				</button>

				{isEdit && (
					<button
						type="button"
						className={cls.danger}
						onClick={handleDelete}
					>
						Видалити
					</button>
				)}
			</div>
		</form>
	);
};

export default ArticleForm;
