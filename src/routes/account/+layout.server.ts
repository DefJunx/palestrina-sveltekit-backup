import { handleLoginRedirect } from '$src/lib/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.getSession();

	if (!session) throw redirect(302, handleLoginRedirect(event));
}
