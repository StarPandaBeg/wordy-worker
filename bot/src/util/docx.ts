export const MM_TO_PX = 3.7795275591;

export const mmToPx = (mm: number) => {
	return mm * MM_TO_PX;
};

// Magic values that found experimentally
const MAX_IMAGE_WIDTH = mmToPx(176);
const MAX_IMAGE_HEIGHT = mmToPx(243);

export const calculateTargetImageSize = (imgWidth: number, imgHeight: number) => {
	const scaleW = MAX_IMAGE_WIDTH / imgWidth;
	const scaleH = MAX_IMAGE_HEIGHT / imgHeight;

	const scale = Math.min(scaleW, scaleH);

	const newWidth = Math.floor(imgWidth * scale);
	const newHeight = Math.floor(imgHeight * scale);

	return {
		width: newWidth,
		height: newHeight,
	};
};

export const defaultFilename = () => {
	const now = new Date();

	const pad = (num) => String(num).padStart(2, '0');

	const day = pad(now.getDate());
	const month = pad(now.getMonth() + 1);
	const year = now.getFullYear();

	const hours = pad(now.getHours());
	const minutes = pad(now.getMinutes());

	return `doc_${day}_${month}_${year}_${hours}_${minutes}.docx`;
};

export const sanitizeFilename = (filename: string) => {
	const forbiddenChars = /[\\\/:*?"<>|]/g;
	return filename.replace(forbiddenChars, '');
};
