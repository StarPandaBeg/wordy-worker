import { Context, Telegraf } from 'telegraf';
import { Handler } from '../bot';
import photoRepository from '../repository/photos';
import { _ } from '../locale';
import * as docx from 'docx';
import { manualUpload } from '../util/upload';
import imageSize from 'image-size';
import { calculateTargetImageSize, defaultFilename, sanitizeFilename } from '../util/docx';

const createDocChild = async (ctx: Context, file_id: string) => {
	const link = await ctx.telegram.getFileLink(file_id);
	const blob = await fetch(link).then((r) => r.blob());

	const arr = new Uint8Array(await blob.arrayBuffer());
	const imgSize = imageSize(arr);
	const targetSize = calculateTargetImageSize(imgSize.width, imgSize.height);

	return new docx.Paragraph({
		children: [
			new docx.ImageRun({
				data: arr,
				transformation: targetSize,
			}),
		],
	});
};

const handler = async (ctx: Context) => {
	let filename = defaultFilename();

	const messageArgs = ctx.text.split(' ');
	if (messageArgs.length > 1) {
		const userFilename = sanitizeFilename(messageArgs[1]);
		if (userFilename.length != 0) filename = `${userFilename}.docx`;
	}

	const photos = await photoRepository.getFor(ctx.from.id);
	if (photos.length == 0) {
		const messageText = _('message_save_nothing');
		await ctx.reply(messageText);
		return;
	}

	const messagePendingText = _('message_save_pending');
	const messageOkText = _('message_save_ok');
	const messageCaptionText = _('message_save_caption');
	const message = await ctx.reply(messagePendingText);

	const children = [];
	for (const photo of photos) {
		const child = await createDocChild(ctx, photo.file_id);
		children.push(child);
	}
	const doc = new docx.Document({ sections: [{ properties: {}, children }] });

	const file = await docx.Packer.toBlob(doc);

	await photoRepository.clearFor(ctx.from.id);
	await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, '', messageOkText);
	await manualUpload(ctx, { file, filename, caption: messageCaptionText });
};

export const register: Handler = async (bot: Telegraf) => {
	bot.command('save', handler);
};
