import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import cls from './Auth.module.css';

const Login = () => {
	const { login, isLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';
	// const from = location.state?.from?.pathname || '/dashboard';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await login({ email, password });
			navigate(from, { replace: true });
		} catch (err) {
			setError(err.message || 'Login failed');
		}
	};

	return (
		<div className={cls.authWrapper}>
			<h1 className={cls.title}>Login</h1>

			<div style={{ color: '#f00505' }}>Увага!!! Використовуй тимчасово
				<div style={{ color: '#178317' }}>
					Email:    test@test.com
					Password: 123456
				</div>
			</div>

			<form className={cls.form} onSubmit={handleSubmit}>
				<div className={cls.field}>
					<label className={cls.label}>Email</label>
					<input
						type="email"
						className={cls.input}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className={cls.field}>
					<label className={cls.label}>Password</label>
					<input
						type="password"
						className={cls.input}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				{error && <div className={cls.error}>{error}</div>}

				<button className={cls.button} type="submit" disabled={isLoading}>
					{isLoading ? 'Logging in…' : 'Login'}
				</button>
			</form>

			<p style={{ color: '#3b3b3b' }}>
				No account? <Link to="/register" style={{ color: '#2b1de6' }}>Register</Link>
			</p>

		</div>
	);
};

export default Login;
