const locale: Record<string, string> = {
	message_start: `👋 Привет\\!\n\n🤖 Меня зовут **Wordy**, я твой помощник в создании Word\\-файлов 😎\n\n📓 Я помогу тебе собрать все фотографии в единый файл, чтобы ты мог отправить его как домашнее задание\n\n📸 Для начала введи /newdoc или просто скинь мне фото`,

	message_newdoc:
		'📑 Создаю новый документ для тебя\\!\n\nОтправь мне фотографии, которые я должен добавить \\(до %total% шт\\.\\)\\.\n\nМожешь присылать несколько сообщений\\. **Порядок фото в документе соответствует порядку отправки**\\!',
	message_newdoc_already:
		'⚠️ Вы уже создали документ прямо сейчас!\n\nПрикрепленных фото: %current%/%total%\n\nВы можете продолжить редактирование или начать заново, используя /clear',

	message_file_not_supported: '🚫 Пока что я не поддерживаю такой формат файлов.\n\nПожалуйста, пришли мне фотографии.',
	message_file_limit_reached: '🚫 Ты уже прикрепил %total% фотографий, я не в силах обработать больше 😰',
	message_file_added: '✅ Файл добавлен (%current%/%total%)',
	message_file_duplicate:
		'⚠️ Дубликат - такой файл уже был прикреплен\n\nПопробуйте немного изменить фотографию - обрезать, осветлить и т.д.',
	message_file_clear_ok: '🗑 Файлы очищены!\n\nМожно прикреплять новые фотографии!',
	message_file_clear_fail: '🗑 У Вас нет прикрепленных файлов!',
	message_file_clear_confirm: '⚠️ Вы действительно хотите удалить %current% файл(ов)?',

	message_status: '📑 Текущий статус документа:\n\nПрикрепленных фото: %current%/%total%',

	message_save_nothing: '⚠️ Документ пуст!',
	message_save_pending: '⏳ Пожалуйста, подожди...',
	message_save_ok: '✅ Твой файл готов!',
	message_save_caption: 'Сделано с помощью @wordypicture_bot',

	button_start: '📸 Начать',
	button_clear: '🗑 Очистить',
	button_confirm: 'Да',
	button_cancel: 'Отмена',
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
