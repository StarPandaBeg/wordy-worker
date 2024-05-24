import { Context, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import photoRepository from '../repository/photos';

const handler = async (ctx: Context) => {
	const affected = await photoRepository.clearFor(ctx.message.from.id);

	const translationKey = affected > 0 ? 'message_file_clear_ok' : 'message_file_clear_fail';
	const messageText = _(translationKey);
	await ctx.reply(messageText);
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('clear', handler);
};
