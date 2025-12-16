import cls from './common.module.css';

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
	return (
		<div className={cls.backdrop} onClick={onCancel}>
			<div className={cls.modal} onClick={e => e.stopPropagation()}>
				<h4>{title}</h4>
				<p>{message}</p>

				<div className={cls.actions}>
					<button className={cls.cancel} onClick={onCancel}>
						Скасувати
					</button>
					<button className={cls.confirm} onClick={onConfirm}>
						Видалити
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
