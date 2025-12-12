import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../../components/Sidebar/FilterSidebar';
import PostList from '../../components/PostList/PostList';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories.js';

const POSTS_PER_PAGE = 6;

const Home = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filters, setFilters] = useState({
		categories: [],
		author: '',
		sort: '',
		page: 1
	});

	// === ALWAYS LOAD FILTERS WHEN URL CHANGES ===
	useEffect(() => {
		const urlCategories = searchParams.get('category');
		const urlAuthor = searchParams.get('author');
		const urlSort = searchParams.get('sort');
		const urlPage = searchParams.get('page');

		setFilters({
			categories: urlCategories
				? urlCategories.split(',').map(Number)
				: [],
			author: urlAuthor || '',
			sort: urlSort || '',
			page: urlPage ? Number(urlPage) : 1
		});
	}, [searchParams]);

	// === UPDATE URL ===
	function updateURL(newFilters) {
		const params = {};

		if (newFilters.categories.length > 0)
			params.category = newFilters.categories.join(',');

		if (newFilters.author) params.author = newFilters.author;
		if (newFilters.sort) params.sort = newFilters.sort;
		if (newFilters.page) params.page = newFilters.page;

		setSearchParams(params);
	}

	// === SIDEBAR CHANGES FILTERS ===
	function handleFilterChange(newFilters) {
		const ready = { ...newFilters, page: 1 }; // reset to page 1
		setFilters(ready);
		updateURL(ready);
	}

	// === FILTER POSTS ===
	const filteredPosts = useMemo(() => {
		let result = [...posts];

		if (filters.categories.length > 0) {
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
			result.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
		}

		if (filters.sort === 'popular') {
			result.sort((a, b) => b.views - a.views);
		}

		if (filters.sort === 'title') {
			result.sort((a, b) => a.title.localeCompare(b.title));
		}

		return result;
	}, [posts, filters]);

	// === PAGINATION ===
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
	const start = (filters.page - 1) * POSTS_PER_PAGE;
	const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

	function goToPage(page) {
		const updated = { ...filters, page };
		setFilters(updated);
		updateURL(updated);
	}

	return (
		<div style={{ display: 'flex', gap: '20px' }}>
			<FilterSidebar
				categories={categories}
				authors={authors}
				onFilterChange={handleFilterChange}
				savedFilters={filters} // ← передаємо sidebar збережені значення
			/>

			<div style={{ flexGrow: 1 }}>
				<PostList
					posts={paginatedPosts}
					authors={authors}
					categories={categories}
				/>

				{/* === PAGINATION UI === */}
				<div
					style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
				>
					<button
						disabled={filters.page === 1}
						onClick={() => goToPage(filters.page - 1)}
					>
						Попередня
					</button>

					{[...Array(totalPages)].map((_, i) => {
						const page = i + 1;
						return (
							<button
								key={page}
								onClick={() => goToPage(page)}
								style={{
									fontWeight:
										page === filters.page
											? 'bold'
											: 'normal'
								}}
							>
								{page}
							</button>
						);
					})}

					<button
						disabled={filters.page === totalPages}
						onClick={() => goToPage(filters.page + 1)}
					>
						Наступна
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
