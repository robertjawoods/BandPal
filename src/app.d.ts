// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Hyperdrive } from '@cloudflare/workers-types';
import type { PrismaClient } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
			authHelpers: {
				signIn: typeof import('@auth/sveltekit').signIn;
				signOut: typeof import('@auth/sveltekit').signOut;
				getSession: () => Promise<import('@auth/core/types').Session | null>;
			};
			prisma: PrismaClient;
		}
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
				HYPERDRIVE: Hyperdrive
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache }
		}
	} // interface Error {}
	// interface Locals {}
} // interface PageData {}
// interface PageState {}

// interface Platform {}
export { };
