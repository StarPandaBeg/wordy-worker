import { Context, Markup, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import { CallbackClear, CallbackNewDoc, TotalPhotoLimit } from '../constants';
import photoRepository from '../repository/photos';

const handler = async (ctx: Context, is_callback: boolean) => {
	const from = is_callback ? ctx.callbackQuery.from : ctx.message.from;
	const total = await photoRepository.countUploadedFor(from.id);

	if (is_callback) {
		// Telegram sometimes repeats request and it leads to 400 errors - reply markup have been already removed
		try {
			await ctx.editMessageReplyMarkup(null);
			await ctx.answerCbQuery();
		} catch (e) {}
	}

	if (total > 0) {
		const messageText = _('message_newdoc_already', { current: total, total: TotalPhotoLimit });
		const buttonText = _('button_clear');
		const keyboard = Markup.inlineKeyboard([
			[{ text: buttonText, callback_data: CallbackClear }], //
		]);

		await ctx.reply(messageText, { reply_markup: keyboard.reply_markup });
		return;
	}

	const messageText = _('message_newdoc', { total: TotalPhotoLimit });
	await ctx.reply(messageText, { parse_mode: 'MarkdownV2' });
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('newdoc', (ctx) => handler(ctx, false));
	bot.action(CallbackNewDoc, (ctx) => handler(ctx, true));
};
