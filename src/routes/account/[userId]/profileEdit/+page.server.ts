import type { Database } from '$src/types/database.types';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { validationSchema } from './validation.schema';

export const load = async ({ url, locals: { supabase }, params }) => {
	let currentProfile: Database['public']['Tables']['profiles']['Row'] | null = null;

	if (!url.searchParams.has('new')) {
		const { data: userProfile, error: userProfileError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', params.userId)
			.single();

		if (userProfileError) {
			throw error(500);
		}

		currentProfile = userProfile;
	}

	const form = await superValidate(
		{
			username: currentProfile?.username ?? '',
			full_name: currentProfile?.full_name ?? '',
			avatar_url: currentProfile?.avatar_url ?? ''
		},
		validationSchema
	);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, validationSchema);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		return { form };
	}
};
