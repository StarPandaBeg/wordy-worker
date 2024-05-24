import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Handler } from '../bot';
import { _ } from '../locale';

const handler = async (ctx: Context) => {
	const messageText = _('message_file_not_supported');
	await ctx.reply(messageText);
};

export const register: Handler = async (bot: Telegraf) => {
	bot.on(message('document'), handler);
};
