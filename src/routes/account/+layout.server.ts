import { handleLoginRedirect } from '$src/lib/utils.js';
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {
	event.depends('update:profile');

	const session = await event.locals.getSession();
	const user = await event.locals.getUser();

	if (!session || !user) throw redirect(302, handleLoginRedirect(event));

	const userProfile = await event.locals.getProfile(user.id);

	if (!userProfile) {
		throw error(500, 'Profile does not exist');
	}

	return { userProfile, userId: user.id };
}
