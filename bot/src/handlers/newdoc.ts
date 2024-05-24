import { Context, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import { CallbackNewDoc } from '../constants';

const handler = async (ctx: Context, is_callback: boolean) => {
	const messageText = _('message_newdoc');

	if (is_callback) {
		await ctx.answerCbQuery();
	}
	await ctx.reply(messageText, { parse_mode: 'MarkdownV2' });
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('newdoc', (ctx) => handler(ctx, false));
	bot.action(CallbackNewDoc, (ctx) => handler(ctx, true));
};
