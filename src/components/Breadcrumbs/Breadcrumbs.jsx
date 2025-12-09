import { Link, useLocation } from 'react-router-dom';
import cls from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
	const location = useLocation();

	const createBreadcrumbs = () => {
		const pathNames = location.pathname.split('/').filter(path => path);

		return pathNames.map((pathName, index) => {
			const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
			const isLast = index === pathNames.length - 1;

			return {
				name: pathName.charAt(0).toUpperCase() + pathName.slice(1),
				path: routeTo,
				isLast
			};
		});
	};

	const breadcrumbs = createBreadcrumbs();

	return (
		<nav className={cls.nav}>
			<Link to="/">Головна</Link>
			{breadcrumbs.map((breadcrumb, index) => {
				return (
					<span key={index}>
						{'/'}
						{breadcrumb.isLast ? (
							<span>{breadcrumb.name}</span>
						) : (
							<Link to={breadcrumb.path}>{breadcrumb.name}</Link>
						)}
					</span>
				);
			})}
		</nav>
	);
};

export default Breadcrumbs;
