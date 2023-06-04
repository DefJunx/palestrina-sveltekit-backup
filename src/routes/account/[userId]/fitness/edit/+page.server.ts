import { error } from '@sveltejs/kit';

export async function load({ locals, params: { userId } }) {
	const userProfile = await locals.getProfile(userId);

	if (!userProfile) {
		throw error(500);
	}

	return { userProfile };
}

export const actions = {
	default: async ({ locals: { supabase }, params, request }) => {
		const formData = await request.formData();
		console.log(formData);
	}
};
