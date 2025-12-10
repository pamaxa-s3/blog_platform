import AuthorCard from '../AuthorCard/AuthorCard';
import cls from './AuthorList.module.css';

const AuthorList = ({ authors = [] }) => {
	if (!authors.length) {
		return <p className={cls.empty}>Автори не знайдені...</p>;
	}

	return (
		<div className={cls.authorList}>
			{authors.map(author => (
				<AuthorCard key={author.id} author={author} />
			))}
		</div>
	);
};

export default AuthorList;
