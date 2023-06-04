import { getAvatarUrl } from '$src/lib/utils.js';
import { error } from '@sveltejs/kit';

export async function load({ locals: { supabase, getProfile, getUser } }) {
	const user = await getUser();

	if (!user) {
		throw error(500, 'Internal server error');
	}

	const profile = await getProfile(user.id);

	if (!profile) {
		throw error(500, 'Internal server error');
	}

	const { data: userProfiles, error: userProfilesError } = await supabase
		.from('profiles')
		.select('*')
		// .neq('id', user.id)
		.eq('has_compiled', true);

	if (userProfilesError) {
		throw error(500, userProfilesError.message);
	}

	const users = await Promise.all(
		userProfiles.map(async (user) => {
			let avatarSrc = '';

			if (user.avatar_path) {
				avatarSrc = await getAvatarUrl(supabase, user.avatar_path);
			}

			return { ...user, avatarSrc };
		})
	);

	return { users };
}
