import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import PostDetail from '../pages/Post/PostDetail'
import SearchResults from '../pages/Search/SearchResults'
import About from '../pages/About/About'
import AuthorProfile from '../pages/Author/AuthorProfile'
import AuthorPosts from '../pages/Author/AuthorPosts'
import AuthorAbout from '../pages/Author/AuthorAbout'
import CategoriesList from '../pages/Categories/CategoriesList'
import CategoryDetail from '../pages/Categories/CategoryDetail'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Auth/Login'
import PostCreate from '../pages/Post/PostCreate'
import PostEdit from '../pages/Post/PostEdit'
import DashboardLayout from '../layouts/DashboardLayout'
import DashboardHome from '../pages/Dashboard/DashboardHome'
import MyPosts from '../pages/Dashboard/MyPosts'
import Settings from '../pages/Dashboard/Settings'
import NotFound from '../pages/NotFound/NotFound'


const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
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
			<Route path="/posts/new" element={
				<ProtectedRoute isAuthenticated={true}>
					<PostCreate />
				</ProtectedRoute>
			} />

			<Route path="/posts/:id/edit" element={
				<ProtectedRoute isAuthenticated={true}>
					<PostEdit />
				</ProtectedRoute>
			} />

			{/* Dashboard */}
			<Route path="/dashboard" element={
				<ProtectedRoute isAuthenticated={true}>
					<DashboardLayout />
				</ProtectedRoute>
			}>
				<Route index element={<DashboardHome />} />
				<Route path="my-posts" element={<MyPosts />} />
				<Route path="settings" element={<Settings />} />
			</Route>

			{/* Not Found */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRouter;
