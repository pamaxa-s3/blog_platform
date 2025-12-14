import cls from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<div className={cls.pagination}>
			<button
				className={cls.button}
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				Попередня
			</button>

			{[...Array(totalPages)].map((_, i) => {
				const page = i + 1;

				return (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`${cls.button} ${page === currentPage ? cls.active : ''
							}`}
					>
						{page}
					</button>
				);
			})}

			<button
				className={cls.button}
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				Наступна
			</button>
		</div>
	);
};

export default Pagination;
