import { InferInsertModel, and, count, eq } from 'drizzle-orm';
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
		await db.insert(photosSchema).values(data).onConflictDoNothing();
	}

	async hasFile(user_id: number, file_id: string) {
		const result = await db
			.select({ value: count() })
			.from(photosSchema)
			.where(and(eq(photosSchema.user_id, user_id), eq(photosSchema.file_id, file_id)));
		return result[0].value > 0;
	}

	async clearFor(user_id: number) {
		const res: { deletedId: number }[] = await db
			.delete(photosSchema)
			.where(eq(photosSchema.user_id, user_id))
			.returning({ deletedId: photosSchema.id });
		return res.length;
	}
}

const photoRepository = new PhotoRepository();
export default photoRepository;
