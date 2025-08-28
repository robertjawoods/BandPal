import { fail, redirect } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { Actions } from './$types';

import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async (event) => {
		const result = await signIn(event);

		if (result?.error) {
			throw fail(400, { message: result.error });
		}

		throw redirect(303, '/');
	}
};
