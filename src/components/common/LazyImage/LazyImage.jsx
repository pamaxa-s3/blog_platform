import { useEffect, useRef, useState } from 'react';
import cls from './LazyImage.module.css';

const LazyImage = ({ src, alt, className }) => {
	const imgRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: '100px' }
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={imgRef} className={cls.wrapper}>
			{!isLoaded && <div className={cls.skeleton} />}

			{isVisible && (
				<img
					src={src}
					alt={alt}
					loading="lazy"
					className={`${cls.image} ${className}`}
					onLoad={() => setIsLoaded(true)}
				/>
			)}
		</div>
	);
};

export default LazyImage;
