import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

export async function load({ locals, params: { userId } }) {
	const userProfile = await locals.getProfile(userId);

	if (!userProfile) {
		throw error(500, { message: 'Internal server error' });
	}

	return { userProfile };
}

export const actions = {
	default: async ({ locals: { supabase }, params, request }) => {
		const formData = await request.formData();
		const { userId } = params;
		const fitnessData: Record<string, string> = {};

		formData.forEach((value, name) => (fitnessData[name] = value as string));

		const validationSchema = z.record(z.string().nonempty(), z.string().nonempty());
		const validationResult = validationSchema.safeParse(fitnessData);

		if (!validationResult.success) {
			return fail(400, {
				fitnessData,
				error: true,
				errorMessage: 'Si prega di compilare tutti i campi'
			});
		}

		const { error: supabaseUpdateError } = await supabase
			.from('profiles')
			.update({ fitness_data: fitnessData, updated_at: new Date().toISOString() })
			.eq('id', userId);

		if (supabaseUpdateError) {
			throw error(500, { message: `Internal server error: ${supabaseUpdateError.message}` });
		}

		return { success: true };
	}
};
