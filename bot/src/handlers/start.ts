import { Context, Markup, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import { CallbackNewDoc } from '../constants';

const handler = async (ctx: Context) => {
	const messageText = _('message_start');
	const buttonText = _('button_start');
	const keyboard = Markup.inlineKeyboard([
		[{ text: buttonText, callback_data: CallbackNewDoc }], //
	]);

	await ctx.reply(messageText, { parse_mode: 'MarkdownV2', reply_markup: keyboard.reply_markup });
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('start', handler);
	bot.command('restart', handler);
};
