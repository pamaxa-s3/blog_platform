import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/Sidebar/DashboardSidebar';
import DashboardBreadcrumbs from '../components/DashboardBreadcrumbs/DashboardBreadcrumbs';
import cls from './DashboardLayout.module.css';

const DashboardLayout = () => {
	return (
		<div className={cls.layout}>
			<DashboardSidebar />

			<main className={cls.content}>
				<DashboardBreadcrumbs />
				<Outlet />
			</main>
		</div>
	);
};

export default DashboardLayout;
