import { Link, useLocation, useNavigate } from 'react-router-dom';
import cls from './DashboardBreadcrumbs.module.css';

const LABELS = {
	'/dashboard': 'Dashboard',
	'/dashboard/my-posts': 'Мої статті',
	'/dashboard/settings': 'Налаштування'
};

const DashboardBreadcrumbs = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const canGoBack = location.key !== 'default';
	const segments = location.pathname.split('/').filter(Boolean);

	const breadcrumbs = segments.reduce((acc, segment, index) => {
		const path = '/' + segments.slice(0, index + 1).join('/');
		acc.push({
			path,
			label: LABELS[path] || segment
		});
		return acc;
	}, []);

	return (
		<nav className={cls.wrapper}>
			<div className={cls.breadcrumbs}>
				{breadcrumbs.map((item, index) => {
					const isLast = index === breadcrumbs.length - 1;

					return (
						<span key={item.path} className={cls.item}>
							{!isLast ? (
								<>
									<Link to={item.path} className={cls.link}>
										{item.label}
									</Link>
									<span className={cls.separator}>/</span>
								</>
							) : (
								<span className={cls.current}>{item.label}</span>
							)}
						</span>
					);
				})}
			</div>

			{canGoBack && (
				<button
					type="button"
					onClick={() => navigate(-1)}
					className={cls.backButton}
				>
					← Назад
				</button>
			)}
		</nav>
	);
};

export default DashboardBreadcrumbs;