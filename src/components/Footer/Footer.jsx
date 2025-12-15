import { Mail, Telegram } from '../../assets/icons';
import cls from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={cls.footer}>
			<div className={cls.container}>
				<span className={cls.text}>
					Створив <strong>Roman Strynzha</strong>
				</span>

				<div className={cls.links}>
					<a
						href="https://t.me/pamaxa_s3"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Telegram"
					>
						<Telegram className={cls.icon} />
						Telegram
					</a>

					<a href="mailto:pamaxas3@gmail.com" aria-label="Email">
						<Mail className={cls.icon} />
						pamaxas3@gmail.com
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
