export const posts = [
	{
		id: 1,
		title: "Початок роботи з React Router",
		slug: "react-router-basics",
		excerpt: "Короткий опис статті для списків...",
		content: "Повний текст статті тут... (мінімум 500 символів). React Router є однією з найважливіших бібліотек у світі SPA-додатків, і ця стаття пояснює базові поняття маршрутизації, включно з Routes, Route, посиланнями, вкладеними маршрутами та динамічними шляхами. Ви дізнаєтеся, як організувати структуру застосунку так, щоб було легко додавати нові сторінки та оптимізувати переходи без перезавантаження сторінок...",
		authorId: 1,
		categoryId: 1,
		tags: ["react", "routing", "spa"],
		imageUrl: "https://picsum.photos/800/400?random=1",
		createdAt: "2024-01-15T10:00:00Z",
		views: 1250,
		commentsCount: 15,
		status: "published"
	},

	// --- Початок автозгенерованих статей ---
	...Array.from({ length: 25 }).map((_, i) => {
		const id = i + 2;
		const titles = [
			"Як працюють хуки в React",
			"Оптимізація продуктивності у фронтенді",
			"Що таке Context API",
			"Навіщо потрібний TypeScript",
			"Побудова адаптивного UI",
			"React + Node: повний стек",
			"Патерни в React",
			"Нові можливості ES2024",
			"Вступ до Redux Toolkit",
			"Захист API: поради",
			"Як працюють WebSockets",
			"Завантаження файлів у React",
			"Маршрутизація на практиці",
			"Помилки React і як їх уникати",
			"Unit testing у фронтенді",
			"Динамічні форми у React",
			"Що таке Suspense",
			"React Server Components",
			"Налаштування Vite",
			"Композиція компонентів",
			"Порівняння bundlers",
			"Як працює Zustand",
			"Підготовка до співбесіди Frontend",
			"SEO у SPA",
			"Мікрофронтенди — майбутнє?"
		];

		const category = (i % 6) + 1;
		const author = (i % 5) + 1;

		return {
			id,
			title: titles[i],
			slug: titles[i].toLowerCase().replace(/\s+/g, "-"),
			excerpt: "Короткий опис статті для списків...",
			content:
				"Тут повний текст статті... (500+ символів). У цій статті розглядається тема '" +
				titles[i] +
				"'. Ми детально аналізуємо приклади, наводимо реальні кейси, показуємо фрагменти коду і розбираємо типові помилки, які роблять початківці. Ви також отримаєте поради від експертів і зможете одразу застосувати їх у реальних проєктах. Стаття містить корисні інструкції, покрокові пояснення та рекомендації з оптимізації, що допоможуть вам працювати ефективніше.",
			authorId: author,
			categoryId: category,
			tags: ["react", "frontend", "javascript", `tag-${category}`],
			imageUrl: `https://picsum.photos/800/400?random=${id}`,
			createdAt: new Date(2024, 0, i + 2, 10, 0, 0).toISOString(),
			views: Math.floor(Math.random() * 5000),
			commentsCount: Math.floor(Math.random() * 40),
			status: Math.random() > 0.15 ? "published" : "draft"
		};
	})
];
