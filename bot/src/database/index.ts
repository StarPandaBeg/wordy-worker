import { drizzle } from 'drizzle-orm/d1';

export const db = drizzle(globalThis.__env__.DB);
