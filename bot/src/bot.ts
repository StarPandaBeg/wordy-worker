import { Telegraf } from 'telegraf';
import { requireAll } from './util';

export type Handler = (bot: Telegraf) => Promise<void>;

const setupHandler = (bot: Telegraf, key: string, module: any) => {
	if (!module.hasOwnProperty('register')) throw new Error(`No register function export from ${key}`);
	const handler = module.register as Handler;
	handler(bot);
};

const setupHandlers = (bot: Telegraf) => {
	const r = require.context('./handlers/', true, /\.ts$/);
	requireAll(r, (key, module) => {
		try {
			setupHandler(bot, key, module);
			console.log(`Module ${key} is configured successfully`);
		} catch (e) {
			console.error(`Error during ${key} module setup`, e);
		}
	});
};

export const setupBot = (bot: Telegraf) => {
	setupHandlers(bot);
};
