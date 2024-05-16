import { Telegraf } from 'telegraf';
import { BotOptions } from './types/bot';
import { setupBot as _setupBot } from './bot';

import createTelegrafMiddleware from 'cfworker-middleware-telegraf';

export const setupBot = (options: BotOptions) => {
	const bot = new Telegraf(options.config.token);
	_setupBot(bot);

	return createTelegrafMiddleware(bot);
};
