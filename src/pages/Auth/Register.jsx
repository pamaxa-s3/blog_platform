import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import cls from './Auth.module.css';

const Register = () => {
	const { login, isLoading } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState(null);

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (form.password !== form.confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			await login({
				email: form.email,
				password: form.password,
			});

			navigate('/', { replace: true });
			// navigate('/dashboard', { replace: true });
		} catch (err) {
			setError(err.message || 'Registration failed');
		}
	};

	return (
		<div className={cls.authWrapper}>
			<h1 className={cls.title}>Register</h1>

			<div style={{ color: '#f00505' }}>Увага!!! Використовуй тимчасово
				<div style={{ color: '#178317' }}>
					Email:    test@test.com
					Password: 123456
				</div>
			</div>

			<form className={cls.form} onSubmit={handleSubmit}>
				<div className={cls.field}>
					<label className={cls.label}>Name</label>
					<input
						name="name"
						className={cls.input}
						value={form.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={cls.field}>
					<label className={cls.label}>Email</label>
					<input
						type="email"
						name="email"
						className={cls.input}
						value={form.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={cls.field}>
					<label className={cls.label}>Password</label>
					<input
						type="password"
						name="password"
						className={cls.input}
						value={form.password}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={cls.field}>
					<label className={cls.label}>Confirm password</label>
					<input
						type="password"
						name="confirmPassword"
						className={cls.input}
						value={form.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>

				{error && <div className={cls.error}>{error}</div>}

				<button className={cls.button} type="submit" disabled={isLoading}>
					{isLoading ? 'Creating account…' : 'Register'}
				</button>
			</form>

			<p style={{ color: '#3b3b3b' }}>
				Already have an account? <Link to="/login" style={{ color: '#2b1de6' }}>Login</Link>
			</p>

		</div>
	);
};

export default Register;
