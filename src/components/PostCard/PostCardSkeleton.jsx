import cls from './PostCardSkeleton.module.css';

const PostCardSkeleton = () => {
	return (
		<div className={cls.card}>
			<div className={cls.image} />

			<div className={cls.content}>
				<div className={cls.lineSm} />
				<div className={cls.lineLg} />
				<div className={cls.lineMd} />
			</div>
		</div>
	);
};

export default PostCardSkeleton;