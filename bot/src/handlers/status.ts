import { Context, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import { _ } from '../locale';
import photoRepository from '../repository/photos';
import { TotalPhotoLimit } from '../constants';

const handler = async (ctx: Context) => {
	const total = await photoRepository.countUploadedFor(ctx.message.from.id);

	const messageText = _('message_status', { current: total, total: TotalPhotoLimit });
	await ctx.reply(messageText);
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('status', handler);
};
