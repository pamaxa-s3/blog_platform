import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import cls from './MainLayout.module.css';

const MainLayout = () => {
	return (
		<div className={cls.mainLayout}>
			<Header />

			<div className={cls.layoutWrapper}>
				<div className={cls.container}>
					<Breadcrumbs />

					<main className={cls.main}>
						<Outlet />
					</main>

					<Footer />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
