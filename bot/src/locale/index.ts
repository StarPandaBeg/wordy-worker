const locale: Record<string, string> = {
	message_start: `👋 Привет\\!\n\n🤖 Меня зовут **Wordy**, я твой помощник в создании Word\\-файлов 😎\n\n📓 Я помогу тебе собрать все фотографии в единый файл, чтобы ты мог отправить его как домашнее задание\n\n📸 Для начала введи /newdoc или просто скинь мне фото`,
	button_start: '📸 Начать',

	message_newdoc:
		'📑 Создаю новый документ для тебя\\!\n\nОтправь мне фотографии, которые я должен добавить \\(до 20 штук\\)\\.\n\nМожешь присылать несколько сообщений\\. **Порядок фото в документе соответствует порядку отправки**\\!',
	message_file_not_supported: '🚫 Пока что я не поддерживаю такой формат файлов.\n\nПожалуйста, пришли мне фотографии.',
};

export const _ = (key: string, replacements?: Record<string, any>) => {
	if (key in locale) {
		let val = locale[key];
		if (!replacements) return val;
		for (const [key, value] of Object.entries(replacements)) {
			val = val.replace(`%${key}%`, value);
		}
		return val;
	}
	throw new Error(`Unknown locale key: ${key}`);
};
