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
    const nextFilters = {
      categories: searchParams.get('category')
        ? searchParams.get('category').split(',').map(Number)
        : [],
      author: searchParams.get('author') || '',
      sort: searchParams.get('sort') || '',
      page: searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters(prev =>
      JSON.stringify(prev) === JSON.stringify(nextFilters)
        ? prev
        : nextFilters
    );
  }, [searchParams]);


  function updateURL(next) {
    const params = {};

    if (next.categories.length) params.category = next.categories.join(',');
    if (next.author) params.author = next.author;
    if (next.sort) params.sort = next.sort;
    if (next.page > 1) params.page = next.page;

    setSearchParams(params);
  }

  function handleFilterChange(partial) {
    const next = {
      ...filters,
      ...partial,
      page: 1
    };

    setFilters(next);
    updateURL(next);
  }

  function goToPage(page) {
    const next = { ...filters, page };
    setFilters(next);
    updateURL(next);
  }

  /* === FILTER + SORT === */
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
  }, [filters]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const start = (filters.page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className={cls.home}>
      <FilterSidebar
        categories={categories}
        authors={authors}
        savedFilters={filters}
        onFilterChange={handleFilterChange}
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