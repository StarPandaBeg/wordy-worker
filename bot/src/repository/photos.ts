import { InferInsertModel, count, eq } from 'drizzle-orm';
import { db } from '../database';
import { Repository } from './repository';
import { photos as photosSchema } from '../database/schema';

type Photo = InferInsertModel<typeof photosSchema>;

class PhotoRepository extends Repository {
	async countUploadedFor(user_id: number) {
		const result = await db.select({ value: count() }).from(photosSchema).where(eq(photosSchema.user_id, user_id));
		return result[0].value;
	}

	async addPhotoInfo(data: Photo) {
		await db.insert(photosSchema).values(data);
	}
}

const photoRepository = new PhotoRepository();
export default photoRepository;
