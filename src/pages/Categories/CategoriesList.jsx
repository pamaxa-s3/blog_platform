import { Link } from 'react-router-dom';
import cls from './CategoriesList.module.css';
import { categories } from '../../data/mockCategories';

const CategoriesList = () => {
	if (!categories || categories.length === 0) {
		return <p>Категорій поки немає.</p>;
	}

	return (
		<section className={cls.categories}>
			<h2 className={cls.title}>Категорії</h2>
			<div className={cls.grid}>
				{categories.map(category => (
					<Link
						to={`/categories/${category.slug}`}
						key={category.id}
						className={cls.card}
						style={{ borderColor: category.color || '#ccc' }}
					>
						<div
							className={cls.icon}
							style={{
								backgroundColor: category.color || '#ccc'
							}}
						>
							{category.icon || '❓'}
						</div>
						<div className={cls.content}>
							<h3 className={cls.name}>{category.name}</h3>
							<p className={cls.description}>
								{category.description}
							</p>
							<span className={cls.postsCount}>
								{category.postsCount ?? 0} статей
							</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default CategoriesList;
