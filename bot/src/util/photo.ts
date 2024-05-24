import { PhotoSize } from 'telegraf/typings/core/types/typegram';

export const getResolution = (photo: PhotoSize) => {
	return photo.width * photo.height;
};

export const compare = (a: PhotoSize, b: PhotoSize) => {
	const aSize = getResolution(a);
	const bSize = getResolution(b);
	return Math.sign(bSize - aSize);
};

export const getWithMaximumResolution = (photos: PhotoSize[]) => {
	return photos.reduce((max, photo) => (compare(max, photo) > 0 ? photo : max));
};
