import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getUser, supabase } }) => {
	const user = await getUser();

	if (!user) {
		throw redirect(302, '/');
	}

	const { data: userProfile, error: profileError } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();

	if (profileError) {
		console.log('profileError');

		throw error(500, profileError.message);
	}

	return { userProfile };
};
