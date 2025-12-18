import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem('auth:user');

		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch {
				localStorage.removeItem('auth:user');
			}
		}

		setIsLoading(false);
	}, []);

	const login = async ({ email, password }) => {
		setIsLoading(true);

		try {

			if (email !== 'test@test.com' || password !== '123456') {
				throw new Error('Invalid credentials');
			}

			const loggedUser = {
				id: 1,
				name: 'Test User',
				email,
				token: 'mock-jwt-token',
			};

			setUser(loggedUser);
			localStorage.setItem('auth:user', JSON.stringify(loggedUser));

			return loggedUser;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('auth:user');
	};

	const value = {
		user,
		isAuthenticated: Boolean(user),
		isLoading,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;