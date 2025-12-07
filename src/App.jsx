import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					{/* Головні сторінки */}
					<Route index element={<Home />} />
					<Route path="posts/:id" element={<PostDetail />} />
					<Route path="search" element={<SearchResults />} />
					<Route path="about" element={<About />} />

					{/* Authors */}
					<Route path="authors/:id" element={<AuthorProfile />}>
						<Route index element={<AuthorPosts />} />
						<Route path="posts" element={<AuthorPosts />} />
						<Route path="about" element={<AuthorAbout />} />
					</Route>

					{/* Categories */}
					<Route path="categories">
						<Route index element={<CategoriesList />} />
						<Route path=":slug" element={<CategoryDetail />} />
					</Route>
				</Route>

				{/* Login */}
				<Route path="/login" element={<AuthLayout />}>
					<Route index element={<Login />} />
				</Route>

				{/* Posts create/edit */}
				<Route path="/posts/new" element={<PostCreate />} />
				<Route path="/posts/:id/edit" element={<PostEdit />} />

				{/* Dashboard */}
				<Route path="/dashboard" element={<DashboardLayout />}>
					<Route index element={<DashboardHome />} />
					<Route path="my-posts" element={<MyPosts />} />
					<Route path="settings" element={<Settings />} />
				</Route>

				{/* Not found */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
