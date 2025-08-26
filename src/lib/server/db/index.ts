import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = postgres(env.DATABASE_URL, { max: 1 });

export const db = drizzle(pool, { schema });
