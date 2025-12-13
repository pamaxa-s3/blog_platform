import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from "react";
import LoadingSpinner from '../components/common/LoadingSpinner'
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from '../pages/ErrorBoundary/ErrorBoundary';
import PublicRoute from './PublicRoute';

// Layouts
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));

// Public pages
const Home = lazy(() => import('../pages/Home/Home'));
const Authors = lazy(() => import('../pages/Authors/Authors'));
const PostDetail = lazy(() => import('../pages/Post/PostDetail'));
const SearchResults = lazy(() => import('../pages/Search/SearchResults'));
const About = lazy(() => import('../pages/About/About'));

// Authors
const AuthorProfile = lazy(() => import('../pages/Author/AuthorProfile'));
const AuthorPosts = lazy(() => import('../pages/Author/AuthorPosts'));
const AuthorAbout = lazy(() => import('../pages/Author/AuthorAbout'));

// Categories
const CategoriesList = lazy(() => import('../pages/Categories/CategoriesList'));
const CategoryDetail = lazy(() => import('../pages/Categories/CategoryDetail'));

// Auth
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));


// Posts
const PostCreate = lazy(() => import('../pages/Post/PostCreate'));
const PostEdit = lazy(() => import('../pages/Post/PostEdit'));

// Dashboard
const DashboardHome = lazy(() => import('../pages/Dashboard/DashboardHome'));
const MyPosts = lazy(() => import('../pages/Dashboard/MyPosts'));
const Settings = lazy(() => import('../pages/Dashboard/Settings'));

// Not found
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const AppRouter = () => {
	return (
		<Suspense fallback={<div style={{ padding: 40 }}><LoadingSpinner /></div>}>
			<Routes errorElement={<ErrorBoundary />}>

				{/* Public routes */}
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="authors" element={<Authors />} />
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

				{/* Auth */}
				<Route
					element={
						<PublicRoute>
							<AuthLayout />
						</PublicRoute>
					}
				>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>


				{/* Create & Edit Posts */}
				<Route
					path="/posts/new"
					element={
						<ProtectedRoute>
							<PostCreate />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/posts/:id/edit"
					element={
						<ProtectedRoute>
							<PostEdit />
						</ProtectedRoute>
					}
				/>

				{/* Dashboard */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<DashboardHome />} />
					<Route path="my-posts" element={<MyPosts />} />
					<Route path="settings" element={<Settings />} />
				</Route>

				{/* Fallback */}
				<Route path="*" element={<NotFound />} />

			</Routes>
		</Suspense>
	);
};

export default AppRouter;