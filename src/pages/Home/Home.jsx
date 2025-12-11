	import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from '../../components/Sidebar/FilterSidebar';
import PostList from '../../components/PostList/PostList';
import { posts } from '../../data/mockPosts';
import { authors } from '../../data/mockAuthors';
import { categories } from '../../data/mockCategories.js';

const Home = () => {
const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    categories: [],
    author: "",
    sort: ""
  });

  // LOAD FILTERS FROM URL
  useEffect(() => {
    const urlCategories = searchParams.get("categories");
    const urlAuthor = searchParams.get("author");
    const urlSort = searchParams.get("sort");

    setFilters({
      categories: urlCategories ? urlCategories.split(",").map(Number) : [],
      author: urlAuthor || "",
      sort: urlSort || ""
    });
  }, []);

  // UPDATE URL ON FILTER CHANGE
  function handleFilterChange(newFilters) {
    setFilters(newFilters);

    const params = {};

    if (newFilters.categories.length > 0)
      params.categories = newFilters.categories.join(",");

    if (newFilters.author) params.author = newFilters.author;

    if (newFilters.sort) params.sort = newFilters.sort;

    setSearchParams(params);
  }

  // FILTERING LOGIC
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (filters.categories.length > 0) {
      result = result.filter(post =>
        filters.categories.includes(post.categoryId)
      );
    }

    if (filters.author) {
      result = result.filter(post => post.authorId === Number(filters.author));
    }

    if (filters.sort === "date") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filters.sort === "popular") {
      result.sort((a, b) => b.views - a.views);
    }

    if (filters.sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [posts, filters]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <FilterSidebar
        categories={categories}
        authors={authors}
        onFilterChange={handleFilterChange}
        savedFilters={filters}   // передаємо в Sidebar
      />

      <PostList posts={filteredPosts} authors={authors} categories={categories} />
    </div>
  );
};

export default Home;
