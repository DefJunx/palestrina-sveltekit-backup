import type { Database } from '$src/types/database.types';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { validationSchema } from './validation.schema';

export async function load({ url, locals: { supabase }, params }) {
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
			full_name: currentProfile?.full_name ?? ''
		},
		validationSchema
	);

	const avatarPath = currentProfile?.avatar_url || '';

	return { form, avatarPath };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, validationSchema);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const avatar = formData.get('avatar');

		if (avatar instanceof File) {
			console.log('file');
			console.log('avatar', avatar);
		}

		return { form };
	}
};
