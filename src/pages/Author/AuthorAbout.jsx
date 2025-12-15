import { useParams } from 'react-router-dom';
import { authors } from '../../data/mockAuthors';
import cls from './AuthorAbout.module.css';

const AuthorAbout = () => {
	const { id } = useParams();
	const author = authors.find(a => a.id === Number(id));

	if (!author) return null;

	return (
		<div className={cls.about}>
			<h2>Біографія</h2>
			<p>{author.bio}</p>

			{author.socialLinks && (
				<>
					<h3>Соціальні мережі</h3>
					<ul className={cls.socials}>
						{author.socialLinks.twitter && (
							<li>
								<a
									href={author.socialLinks.twitter}
									target="_blank"
								>
									Twitter
								</a>
							</li>
						)}
						{author.socialLinks.github && (
							<li>
								<a
									href={author.socialLinks.github}
									target="_blank"
								>
									GitHub
								</a>
							</li>
						)}
						{author.socialLinks.linkedin && (
							<li>
								<a
									href={author.socialLinks.linkedin}
									target="_blank"
								>
									LinkedIn
								</a>
							</li>
						)}
					</ul>
				</>
			)}

		</div>
	);
};

export default AuthorAbout;
