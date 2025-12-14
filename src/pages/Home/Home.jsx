import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../../components/Sidebar/FilterSidebar';
import PostList from '../../components/PostList/PostList';
import Pagination from '../../components/Pagination/Pagination';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';
import cls from './Home.module.css';

const POSTS_PER_PAGE = 6;

const Home = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filters, setFilters] = useState({
		categories: [],
		author: '',
		sort: '',
		page: 1
	});

	useEffect(() => {
		const urlCategories = searchParams.get('category');
		const urlAuthor = searchParams.get('author');
		const urlSort = searchParams.get('sort');
		const urlPage = searchParams.get('page');

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setFilters({
			categories: urlCategories ? urlCategories.split(',').map(Number) : [],
			author: urlAuthor || '',
			sort: urlSort || '',
			page: urlPage ? Number(urlPage) : 1
		});
	}, [searchParams]);

	function updateURL(newFilters) {
		const params = {};

		if (newFilters.categories.length) {
			params.category = newFilters.categories.join(',');
		}
		if (newFilters.author) params.author = newFilters.author;
		if (newFilters.sort) params.sort = newFilters.sort;
		if (newFilters.page) params.page = newFilters.page;

		setSearchParams(params);
	}

	function handleFilterChange(newFilters) {
		const readyFilters = { ...newFilters, page: 1 };
		setFilters(readyFilters);
		updateURL(readyFilters);
	}

	const filteredPosts = useMemo(() => {
		let result = [...posts];

		if (filters.categories.length) {
			result = result.filter(post =>
				filters.categories.includes(post.categoryId)
			);
		}

		if (filters.author) {
			result = result.filter(
				post => post.authorId === Number(filters.author)
			);
		}

		if (filters.sort === 'date') {
			result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		}

		if (filters.sort === 'popular') {
			result.sort((a, b) => b.views - a.views);
		}

		if (filters.sort === 'title') {
			result.sort((a, b) => a.title.localeCompare(b.title));
		}

		return result;
	}, [filters]);

	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
	const start = (filters.page - 1) * POSTS_PER_PAGE;
	const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

	function goToPage(page) {
		const updatedFilters = { ...filters, page };
		setFilters(updatedFilters);
		updateURL(updatedFilters);
	}

	return (
		<div className={cls.home}>
			<FilterSidebar
				categories={categories}
				authors={authors}
				onFilterChange={handleFilterChange}
				savedFilters={filters}
			/>

			<div className={cls.content}>
				<PostList
					posts={paginatedPosts}
					authors={authors}
					categories={categories}
				/>

				<Pagination
					currentPage={filters.page}
					totalPages={totalPages}
					onPageChange={goToPage}
				/>
			</div>
		</div>
	);
};

export default Home;
