import { getAvatarUrl, handleLoginRedirect } from '$src/lib/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	console.log('layout load');

	event.depends('update:profile');

	const session = await event.locals.getSession();
	const user = await event.locals.getUser();

	if (!session || !user) throw redirect(302, handleLoginRedirect(event));

	const userProfile = await event.locals.getProfile(user.id);

	let avatarSrc = '';
	const fullName = userProfile?.full_name ?? '';

	if (userProfile && userProfile.avatar_path) {
		avatarSrc = await getAvatarUrl(event.locals.supabase, userProfile.avatar_path);
	}

	console.log('avatarPath', userProfile?.avatar_path);
	console.log('fullNAme', userProfile?.full_name);
	console.log('------');

	return { userProfile, avatarSrc, fullName };
}
