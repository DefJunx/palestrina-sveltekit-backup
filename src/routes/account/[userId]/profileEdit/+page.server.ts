import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { validationSchema } from './validation.schema';

export async function load({ url, locals: { supabase }, params }) {
	let avatarPath = '';
	let form: Awaited<ReturnType<typeof superValidate>>;

	if (!url.searchParams.has('new')) {
		const { data: userProfile, error: userProfileError } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', params.userId)
			.single();

		if (userProfileError) {
			throw error(500);
		}

		form = await superValidate(
			{
				username: userProfile.username ?? '',
				full_name: userProfile.full_name ?? ''
			},
			validationSchema
		);

		avatarPath = userProfile.avatar_url ?? '';
	} else {
		form = await superValidate(validationSchema);
	}

	return { form, avatarPath };
}

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, validationSchema);
		let avatar_url = '';

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const avatar = formData.get('avatar');

		if (avatar && avatar instanceof File) {
			console.log('file');
			console.log('avatar', avatar);

			try {
				const { data: avatarData, error: avatarError } = await supabase.storage
					.from('avatars')
					.upload(`${params.userId}`, avatar, {
						cacheControl: '3600',
						upsert: true
					});

				if (avatarData) {
					avatar_url = avatarData.path;
				}
			} catch (e) {
				console.error(e);
			}
		}

		const {
			data: { full_name, username }
		} = form;

		const { count, error } = await supabase.from('profiles').upsert({
			id: params.userId,
			has_compiled: true,
			full_name,
			username,
			avatar_url
		});

		if (error) {
			return fail(500, { form });
		}

		if (count !== 0) {
			throw redirect(302, '/account');
		}

		return { form };
	}
};
