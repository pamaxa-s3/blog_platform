export const comments = [
	{
		id: 1,
		postId: 1,
		authorName: "Марія Петренко",
		authorAvatar: "https://i.pravatar.cc/50?img=5",
		content: "Дуже корисна стаття! Дякую за пояснення.",
		createdAt: "2024-01-16T14:30:00Z",
		parentId: null
	},
	{
		id: 2,
		postId: 1,
		authorName: "Іван Шевченко",
		authorAvatar: "https://i.pravatar.cc/50?img=12",
		content: "Згоден! Особливо сподобалась частина про nested routes.",
		createdAt: "2024-01-16T15:00:00Z",
		parentId: 1
	},

	// ---- ДОДАНІ КОМЕНТАРІ ----

	{
		id: 3,
		postId: 2,
		authorName: "Олег Данилюк",
		authorAvatar: "https://i.pravatar.cc/50?img=7",
		content: "Дуже круте пояснення про хуки! Все по поличках.",
		createdAt: "2024-02-01T10:12:00Z",
		parentId: null
	},
	{
		id: 4,
		postId: 2,
		authorName: "Світлана Орел",
		authorAvatar: "https://i.pravatar.cc/50?img=14",
		content: "А як щодо кастомних хуків? Чи буде окрема стаття?",
		createdAt: "2024-02-01T10:45:00Z",
		parentId: 3
	},

	{
		id: 5,
		postId: 3,
		authorName: "Петро Лавриненко",
		authorAvatar: "https://i.pravatar.cc/50?img=9",
		content: "Context API — мастхев для глобального стейту.",
		createdAt: "2024-02-10T09:00:00Z",
		parentId: null
	},
	{
		id: 6,
		postId: 3,
		authorName: "Анна Коваль",
		authorAvatar: "https://i.pravatar.cc/50?img=17",
		content: "Redux чи Context? Для великого проєкту що краще?",
		createdAt: "2024-02-10T09:20:00Z",
		parentId: 5
	},

	{
		id: 7,
		postId: 4,
		authorName: "Олена Романюк",
		authorAvatar: "https://i.pravatar.cc/50?img=3",
		content: "TypeScript реально спрощує життя.",
		createdAt: "2024-02-15T11:10:00Z",
		parentId: null
	},

	{
		id: 8,
		postId: 4,
		authorName: "Віталій Смирнов",
		authorAvatar: "https://i.pravatar.cc/50?img=8",
		content: "Але й іноді займає більше часу на старті 🫠",
		createdAt: "2024-02-15T11:40:00Z",
		parentId: 7
	},

	{
		id: 9,
		postId: 5,
		authorName: "Тарас Мельничук",
		authorAvatar: "https://i.pravatar.cc/50?img=11",
		content: "Адаптивний UI — must have у 2024.",
		createdAt: "2024-02-20T14:22:00Z",
		parentId: null
	},

	{
		id: 10,
		postId: 6,
		authorName: "Валентина Орлик",
		authorAvatar: "https://i.pravatar.cc/50?img=22",
		content: "Повний стек на React+Node виглядає перспективно.",
		createdAt: "2024-02-22T13:00:00Z",
		parentId: null
	},

	{
		id: 11,
		postId: 7,
		authorName: "Олег Задорожний",
		authorAvatar: "https://i.pravatar.cc/50?img=28",
		content: "Патерни React — тема окрема й важлива!",
		createdAt: "2024-02-25T15:10:00Z",
		parentId: null
	},

	{
		id: 12,
		postId: 8,
		authorName: "Марина Шульга",
		authorAvatar: "https://i.pravatar.cc/50?img=13",
		content: "Оновлення ES2024 виглядають дуже сильними.",
		createdAt: "2024-02-27T09:30:00Z",
		parentId: null
	},

	{
		id: 13,
		postId: 9,
		authorName: "Арсен Паламарчук",
		authorAvatar: "https://i.pravatar.cc/50?img=21",
		content: "Redux Toolkit — топ!",
		createdAt: "2024-03-01T10:00:00Z",
		parentId: null
	},

	{
		id: 14,
		postId: 9,
		authorName: "Оксана Білик",
		authorAvatar: "https://i.pravatar.cc/50?img=16",
		content: "Згодна, RTK значно простіше за класичний Redux.",
		createdAt: "2024-03-01T10:25:00Z",
		parentId: 13
	},

	{
		id: 15,
		postId: 10,
		authorName: "Юрій Дяченко",
		authorAvatar: "https://i.pravatar.cc/50?img=18",
		content: "Безпека API — критична тема.",
		createdAt: "2024-03-05T12:40:00Z",
		parentId: null
	},

	{
		id: 16,
		postId: 11,
		authorName: "Ігор Веселов",
		authorAvatar: "https://i.pravatar.cc/50?img=24",
		content: "WebSockets відкривають дуже багато можливостей.",
		createdAt: "2024-03-10T08:30:00Z",
		parentId: null
	},

	{
		id: 17,
		postId: 12,
		authorName: "Сергій Панасюк",
		authorAvatar: "https://i.pravatar.cc/50?img=27",
		content: "Хороша стаття, зберіг у закладки.",
		createdAt: "2024-03-12T11:09:00Z",
		parentId: null
	},

	{
		id: 18,
		postId: 13,
		authorName: "Віктор Павленко",
		authorAvatar: "https://i.pravatar.cc/50?img=32",
		content: "Маршрутизація звучить просто, але має нюанси.",
		createdAt: "2024-03-13T14:55:00Z",
		parentId: null
	},

	{
		id: 19,
		postId: 14,
		authorName: "Леся Кравець",
		authorAvatar: "https://i.pravatar.cc/50?img=31",
		content: "Корисна інформація 👍",
		createdAt: "2024-03-15T13:22:00Z",
		parentId: null
	},

	{
		id: 20,
		postId: 15,
		authorName: "Мирослав Жук",
		authorAvatar: "https://i.pravatar.cc/50?img=36",
		content: "Тести — найменш улюблена тема, але необхідна.",
		createdAt: "2024-03-18T10:10:00Z",
		parentId: null
	},

	{
		id: 21,
		postId: 16,
		authorName: "Ірина Лучко",
		authorAvatar: "https://i.pravatar.cc/50?img=38",
		content: "Динамічні форми — дуже зручно!",
		createdAt: "2024-03-20T09:00:00Z",
		parentId: null
	},

	{
		id: 22,
		postId: 17,
		authorName: "Роман Беляк",
		authorAvatar: "https://i.pravatar.cc/50?img=39",
		content: "Suspense виглядає дуже перспективно.",
		createdAt: "2024-03-22T12:30:00Z",
		parentId: null
	},

	{
		id: 23,
		postId: 18,
		authorName: "Володимир Новак",
		authorAvatar: "https://i.pravatar.cc/50?img=40",
		content: "RSC — революція!",
		createdAt: "2024-03-24T17:00:00Z",
		parentId: null
	},

	{
		id: 24,
		postId: 19,
		authorName: "Катерина Сидоренко",
		authorAvatar: "https://i.pravatar.cc/50?img=41",
		content: "Vite — найкращий дев-сервер.",
		createdAt: "2024-03-25T08:40:00Z",
		parentId: null
	},

	{
		id: 25,
		postId: 20,
		authorName: "Микола Тимчук",
		authorAvatar: "https://i.pravatar.cc/50?img=42",
		content: "Композиція компонентів — must-know.",
		createdAt: "2024-03-26T11:22:00Z",
		parentId: null
	},

	{
		id: 26,
		postId: 20,
		authorName: "Віра Чумак",
		authorAvatar: "https://i.pravatar.cc/50?img=43",
		content: "Згодна, це дуже зручний підхід.",
		createdAt: "2024-03-26T12:05:00Z",
		parentId: 25
	},

	{
		id: 27,
		postId: 7,
		authorName: "Юлія Орестова",
		authorAvatar: "https://i.pravatar.cc/50?img=44",
		content: "Чудове пояснення патернів!",
		createdAt: "2024-03-28T10:00:00Z",
		parentId: null
	},

	{
		id: 28,
		postId: 8,
		authorName: "Олексій Терещенко",
		authorAvatar: "https://i.pravatar.cc/50?img=45",
		content: "ES2024 огляд — 🔥",
		createdAt: "2024-03-29T14:00:00Z",
		parentId: null
	},

	{
		id: 29,
		postId: 11,
		authorName: "Георгій Лисенко",
		authorAvatar: "https://i.pravatar.cc/50?img=46",
		content: "WebSockets простіше, ніж здається.",
		createdAt: "2024-03-30T09:50:00Z",
		parentId: null
	},

	{
		id: 30,
		postId: 12,
		authorName: "Дмитро Нечай",
		authorAvatar: "https://i.pravatar.cc/50?img=47",
		content: "Чекаю продовження статті.",
		createdAt: "2024-03-30T13:10:00Z",
		parentId: null
	}
];
