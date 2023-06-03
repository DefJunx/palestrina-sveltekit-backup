import { handleLoginRedirect } from '$src/lib/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.getSession();
	const user = await event.locals.getUser();

	if (!session || !user) throw redirect(302, handleLoginRedirect(event));

	const userProfile = await event.locals.getProfile(user.id);

	return { userProfile };
}
