import { Context, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import photoRepository from '../repository/photos';
import { CallbackClear } from '../constants';

const handler = async (ctx: Context, is_callback: boolean) => {
	const from = is_callback ? ctx.callbackQuery.from : ctx.message.from;
	const affected = await photoRepository.clearFor(from.id);

	const translationKey = affected > 0 ? 'message_file_clear_ok' : 'message_file_clear_fail';
	const messageText = _(translationKey);

	if (is_callback) {
		await ctx.editMessageReplyMarkup(undefined);
		await ctx.answerCbQuery();
	}
	await ctx.reply(messageText);
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('clear', (ctx) => handler(ctx, false));
	bot.action(CallbackClear, (ctx) => handler(ctx, true));
};
