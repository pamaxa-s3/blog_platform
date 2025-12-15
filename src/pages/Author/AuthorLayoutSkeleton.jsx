import cls from './AuthorLayoutSkeleton.module.css';

const AuthorLayoutSkeleton = () => {
	return (
		<section className={cls.wrapper}>
			<div className={cls.header}>
				<div className={cls.avatar} />
				<div className={cls.info}>
					<div className={cls.lineLg} />
					<div className={cls.lineMd} />
					<div className={cls.stats}>
						<div />
						<div />
						<div />
					</div>
				</div>
			</div>

			<div className={cls.tabs}>
				<div />
				<div />
			</div>

			<div className={cls.content}>
				<div className={cls.card} />
				<div className={cls.card} />
				<div className={cls.card} />
			</div>
		</section>
	);
};

export default AuthorLayoutSkeleton;