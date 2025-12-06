import { Routes, Route } from 'react-router';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';

import './App.css';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<div>Outlet</div>}>
					<Route index element={<div></div>} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
