import { Link } from 'react-router-dom';
import cls from './AuthorCard.module.css';

const AuthorCard = ({ author }) => {
	const {
		id,
		name,
		slug,
		email,
		bio,
		avatar,
		socialLinks: { twitter, github, linkedin },
		postsCount,
		commentsCount,
		followers
	} = author;

	return (
		<div className={cls.authorCard}>
			<Link to={`/authors/${id}`} className={cls.imageWrapper}>
				<img src={avatar} alt={name} />
			</Link>

			<div className={cls.authorContent}>
				<Link to={`/authors/${id}`} className={cls.authorTitle}>
					{name}
				</Link>

				<span className={cls.authorSlug}>@{slug}</span>
				<span className={cls.authorEmail}>{email}</span>

				<p className={cls.authorBio}>{bio}</p>

				<div className={cls.social}>
					{twitter && <a href={twitter}>Twitter</a>}
					{github && <a href={github}>GitHub</a>}
					{linkedin && <a href={linkedin}>LinkedIn</a>}
				</div>

				<div className={cls.authorStatistics}>
					<span>📝 {postsCount}</span>
					<span>💬 {commentsCount}</span>
					<span>⭐ {followers}</span>
				</div>
			</div>
		</div>
	);
};

export default AuthorCard;