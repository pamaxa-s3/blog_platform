import { useNavigate } from 'react-router-dom';
import cls from './NotFound.module.css';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className={cls.notFound}>
			<h1 className={cls.headerText}>404</h1>
			<p className={cls.text}>Сторінку не знайдена</p>

			<button
				type="button"
				className={`${cls.buton} ${cls.buttonHome}`}
				onClick={() => navigate('/')}
			>
				На головну
			</button>
			<button
				type="button"
				onClick={() => navigate(-1)}
				className={`${cls.buton} ${cls.buttonBack}`}
			>
				Назад
			</button>
		</div>
	);
};

export default NotFound;
