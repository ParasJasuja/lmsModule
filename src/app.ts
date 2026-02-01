import express from 'express';
import { env } from './config/env.js';
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

app.get('/', (req, res) => {
	res.send('Hello');
});

// Custom global error handler
app.use(globalErrorHandler);

export default app;
