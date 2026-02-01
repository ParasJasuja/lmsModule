import express from 'express';
import { env } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/error.middleware.js';
const app = express();

app.use(express.json());
// CORS configuration
app.use(
	cors({
		origin: env.frontendUrl,
	}),
);

// Auth Routes
app.use(env.apiPrefix, authRouter);
// User Routes
app.use(env.apiPrefix, userRouter);

app.get('/', (req, res) => {
	res.send('Hello');
});

// Custom global error handler
app.use(globalErrorHandler);

export default app;
