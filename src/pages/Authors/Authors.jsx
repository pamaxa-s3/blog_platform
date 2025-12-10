import AuthorList from '../../components/AuthorList/AuthorList';
import { authors } from '../../data/mockAuthors';
import cls from './Authors.module.css';

const Authors = () => {
	return (
		<div className={cls.authors}>
			<AuthorList authors={authors} />
		</div>
	);
};

export default Authors;
