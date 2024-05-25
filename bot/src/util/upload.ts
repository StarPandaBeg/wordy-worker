import { Context } from 'telegraf';

type ManualUploadConfig = {
	file: Blob;
	filename?: string;
	caption?: string;
};

// Added due to strange bugs in telegraf sendDocument method
export const manualUpload = async (ctx: Context, options: ManualUploadConfig) => {
	try {
		const apiRoot = ctx.telegram.options.apiRoot;
		const token = ctx.telegram.token;

		const url = `${apiRoot}/bot${token}/sendDocument`;

		const data = new FormData();
		data.append('chat_id', ctx.chat.id.toString());
		data.append('document', options.file, options.filename);
		if (options.caption) data.append('caption', options.caption);

		await fetch(url, { body: data, method: 'post' });
	} catch (e) {
		console.error(e);
	}
};
