export const env = {
	port: process.env.PORT || 3001,
	nodeEnv: process.env.NODE_ENV || 'development',

	// Database
	database: {
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT) || 5432,
		name: process.env.DB_NAME || 'lmsDB',
		user: process.env.DB_USER || 'paras',
		password: process.env.DB_PASSWORD || 'lmsLocal',
	},

	// JWT
	jwt: {
		secret: process.env.JWT_SECRET || 'localDevTokenSecret',
		expiresIn: process.env.JWT_EXPIRES_IN || 3600,
		refreshSecret: process.env.JWT_REFRESH_SECRET || 'localDevRefreshSecret',
		refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
	},

	// Frontend
	frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

	// API
	apiPrefix: process.env.API_PREFIX || '/api',
	paginationLimit: 10,
};
