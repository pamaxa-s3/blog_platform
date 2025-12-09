import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

const MainLayout = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<div className="layoutWrapper">
				<Breadcrumbs />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default MainLayout
