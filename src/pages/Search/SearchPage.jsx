import { useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';

import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories';

import { highlightText } from '../../utils/highlightText';
import cls from './SearchPage.module.css';

const FILTERS = {
	all: 'Всі',
	posts: 'Статті',
	authors: 'Автори',
	categories: 'Категорії'
};

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const queryRaw = searchParams.get('q') || '';
	const query = queryRaw.toLowerCase();

	const filter = searchParams.get('type') || 'all';

	const results = useMemo(() => {
		if (!query) return null;

		return {
			posts: posts.filter(
				p =>
					p.title.toLowerCase().includes(query) ||
					p.content?.toLowerCase().includes(query)
			),
			authors: authors.filter(a =>
				a.name.toLowerCase().includes(query)
			),
			categories: categories.filter(c =>
				c.name.toLowerCase().includes(query)
			)
		};
	}, [query]);

	function changeFilter(type) {
		setSearchParams(prev => {
			const params = new URLSearchParams(prev);
			params.set('type', type);
			return params;
		});
	}

	if (!query) {
		return (
			<section className={cls.search}>
				<p className={cls.empty}>
					Введіть пошуковий запит
				</p>
			</section>
		);
	}

	const isEmpty =
		results.posts.length === 0 &&
		results.authors.length === 0 &&
		results.categories.length === 0;

	return (
		<section className={cls.search}>
			<h2 className={cls.title}>
				Результати пошуку: “{queryRaw}”
			</h2>

			{/* FILTERS */}
			<div className={cls.filters}>
				{Object.entries(FILTERS).map(([key, label]) => (
					<button
						key={key}
						onClick={() => changeFilter(key)}
						className={filter === key ? cls.active : ''}
					>
						{label}
					</button>
				))}
			</div>

			{isEmpty && (
				<p className={cls.empty}>
					Нічого не знайдено
				</p>
			)}

			{/* POSTS */}
			{(filter === 'all' || filter === 'posts') &&
				results.posts.length > 0 && (
					<div className={cls.block}>
						<h3>Статті</h3>
						<ul>
							{results.posts.map(post => (
								<li key={post.id}>
									<Link to={`/posts/${post.id}`}>
										{highlightText(post.title, queryRaw)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}

			{/* AUTHORS */}
			{(filter === 'all' || filter === 'authors') &&
				results.authors.length > 0 && (
					<div className={cls.block}>
						<h3>Автори</h3>
						<ul>
							{results.authors.map(author => (
								<li key={author.id}>
									<Link to={`/authors/${author.id}`}>
										{highlightText(author.name, queryRaw)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}

			{/* CATEGORIES */}
			{(filter === 'all' || filter === 'categories') &&
				results.categories.length > 0 && (
					<div className={cls.block}>
						<h3>Категорії</h3>
						<ul>
							{results.categories.map(category => (
								<li key={category.id}>
									<Link to={`/categories/${category.slug}`}>
										{highlightText(category.name, queryRaw)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
		</section>
	);
};

export default SearchPage;
