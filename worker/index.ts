import { setupBot } from '../bot/dist/bot';

import { Application, Router } from '@cfworker/web';
import { BotOptions } from '../bot/dist/bot/types/bot';

export interface Env {
	DB: any;
	BOT_API_KEY: string;
	SECRET_PATH: string;
}

const getBotOptions = (env: Env): BotOptions => ({
	config: {
		token: env.BOT_API_KEY,
	},
	db: env.DB,
});

const setupApp = (env: Env) => {
	const router = new Router();
	const botOptions = getBotOptions(env);
	router.post(`/${env.SECRET_PATH}`, setupBot(botOptions));

	const application = new Application();
	application.use(router.middleware);
	return application;
};
let application: Application | null = null;

export default {
	fetch(request: Request, env: Env, context: any) {
		if (application == null) {
			application = setupApp(env);
		}
		return application.handleRequest(request, env, context);
	},
};
