import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Handler } from '../bot';
import { _ } from '../locale';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { TotalPhotoLimit } from '../constants';
import { getWithMaximumResolution } from '../util';
import photoRepository from '../repository/photos';

const handler = async (ctx: Context) => {
	// @ts-ignore
	const photos = ctx.message.photo as PhotoSize[];
	if (photos.length == 0) return;

	const total = await photoRepository.countUploadedFor(ctx.message.from.id);
	if (total >= TotalPhotoLimit) {
		const messageText = _('message_file_limit_reached');
		await ctx.reply(messageText, { reply_parameters: { message_id: ctx.message.message_id } });
		return;
	}

	const fileId = getWithMaximumResolution(photos).file_id;
	await photoRepository.addPhotoInfo({ user_id: ctx.message.from.id, message_id: ctx.message.message_id, file_id: fileId });

	const messageText = _('message_file_added', { current: total + 1, total: TotalPhotoLimit });
	await ctx.reply(messageText, { reply_parameters: { message_id: ctx.message.message_id } });
};

export const register: Handler = async (bot: Telegraf) => {
	bot.on(message('photo'), handler);
};
