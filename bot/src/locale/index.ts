const locale: Record<string, string> = {
	message_start: `👋 Привет\\!\n\n🤖 Меня зовут **Wordy**, я твой помощник в создании Word\\-файлов 😎\n\n📓 Я помогу тебе собрать все фотографии в единый файл, чтобы ты мог отправить его как домашнее задание\n\n📸 Для начала введи /newdoc или просто скинь мне фото`,
	button_start: '📸 Начать',
};

export const _ = (key: string) => {
	if (key in locale) return locale[key];
	throw new Error(`Unknown locale key: ${key}`);
};
