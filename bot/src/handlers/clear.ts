import { Context, Markup, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import photoRepository from '../repository/photos';
import { CallbackClear, CallbackClearCancel, CallbackClearConfirm } from '../constants';

const handlerClear = async (ctx: Context, is_callback: boolean) => {
	const from = is_callback ? ctx.callbackQuery.from : ctx.message.from;
	const total = await photoRepository.countUploadedFor(from.id);

	if (is_callback) {
		await ctx.editMessageReplyMarkup(undefined);
		await ctx.answerCbQuery();
	}

	if (total == 0) {
		const messageText = _('message_file_clear_fail');
		await ctx.reply(messageText);
		return;
	}

	const messageText = _('message_file_clear_confirm', { current: total });
	const buttonConfirmText = _('button_confirm');
	const buttonCancelText = _('button_cancel');
	const keyboard = Markup.inlineKeyboard([
		[{ text: buttonConfirmText, callback_data: CallbackClearConfirm }],
		[{ text: buttonCancelText, callback_data: CallbackClearCancel }],
	]);

	await ctx.reply(messageText, { reply_markup: keyboard.reply_markup });
};

const handlerClearConfirmed = async (ctx: Context, is_callback: boolean) => {
	const from = is_callback ? ctx.callbackQuery.from : ctx.message.from;
	const affected = await photoRepository.clearFor(from.id);

	const translationKey = affected > 0 ? 'message_file_clear_ok' : 'message_file_clear_fail';
	const messageText = _(translationKey);

	if (is_callback) {
		await ctx.deleteMessage();
	}
	await ctx.reply(messageText);
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('clear', (ctx) => handlerClear(ctx, false));
	bot.action(CallbackClear, (ctx) => handlerClear(ctx, true));
	bot.action(CallbackClearCancel, (ctx) => ctx.deleteMessage());

	bot.action(CallbackClearConfirm, (ctx) => handlerClearConfirmed(ctx, true));
};
