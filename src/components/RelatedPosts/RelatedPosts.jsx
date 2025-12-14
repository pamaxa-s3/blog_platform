import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cls from './RelatedPosts.module.css';
import LazyImage from '../common/LazyImage/LazyImage';

const CARD_WIDTH = 236; // 220 + gap

const RelatedPosts = ({ currentPost, allPosts }) => {
	// ✅ ХУКИ ЗАВЖДИ НА ПОЧАТКУ
	const containerRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const related = allPosts
		.filter(
			post =>
				post.id !== currentPost.id &&
				(
					post.category === currentPost.category ||
					post.tags?.some(tag => currentPost.tags?.includes(tag))
				)
		)
		.slice(0, 3);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const index = Math.round(container.scrollLeft / CARD_WIDTH);
			setActiveIndex(Math.min(index, related.length - 1));
		};

		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [related.length]);
	// ✅ ЛОГІКА ПІСЛЯ ХУКІВ
	if (!currentPost) return null;



	if (!related.length) return null;

	const scroll = direction => {
		if (!containerRef.current) return;

		containerRef.current.scrollBy({
			left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
			behavior: 'smooth',
		});
	};



	return (
		<div className={cls.relatedPosts}>
			<h3>Схожі статті</h3>

			<div className={cls.scrollWrapper}>
				<button
					className={cls.scrollBtn}
					onClick={() => scroll('left')}
					disabled={activeIndex === 0}
				>
					‹
				</button>

				<div className={cls.cards} ref={containerRef}>
					{related.map((post) => (
						<Link
							key={post.id}
							to={`/posts/${post.id}`}
							className={cls.card}
						>
							<LazyImage
								src={post.imageUrl}
								alt={post.title}
								className={cls.cardImage}
							/>
							<div className={cls.cardContent}>
								<h4>{post.title}</h4>
								<p>{post.excerpt}</p>
							</div>
						</Link>
					))}
				</div>

				<button
					className={cls.scrollBtn}
					onClick={() => scroll('right')}
					disabled={activeIndex === related.length - 1}
				>
					›
				</button>
			</div>

			<div className={cls.dots}>
				{related.map((_, i) => (
					<span
						key={i}
						className={`${cls.dot} ${i === activeIndex ? cls.dotActive : ''}`}
					/>
				))}
			</div>
		</div>
	);
};

export default RelatedPosts;
