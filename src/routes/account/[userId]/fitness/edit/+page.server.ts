import { error, fail } from '@sveltejs/kit';

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
		const object: Record<string, any> = {};

		formData.forEach((value, name) => (object[name] = value));

		console.log(object);

		const isFail = true;

		if (isFail) {
			return fail(400, { object, error: true });
		}

		return { success: true };
	}
};
