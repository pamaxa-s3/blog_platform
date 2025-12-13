import { Outlet } from 'react-router-dom';
import cls from './styles/AuthLayout.module.css';

const AuthLayout = () => {
	return (
		<div className={cls.authLayout}>
			<div className={cls.authContainer}>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
