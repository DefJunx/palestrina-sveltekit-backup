import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

export async function load({ locals, params: { userId } }) {
	const userProfile = await locals.getProfile(userId);

	if (!userProfile) {
		throw error(500, { message: 'Internal server error' });
	}

	const notesContent = userProfile.fitness_notes ?? '';

	return { userProfile, notesContent };
}

export const actions = {
	default: async ({ locals: { supabase }, params, request }) => {
		const formData = await request.formData();
		const { userId } = params;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fitnessData: Record<string, any> = {};
		const fitness_notes = (formData.get('fitness_notes') as string | null) ?? '';

		formData.forEach((value, name) => {
			console.log('name', name);
			console.log('value', value);

			if (name !== 'fitness_notes') {
				fitnessData[name] = value as string;
			}
		});

		const validationSchema = z.record(z.string().nonempty(), z.string().nonempty());
		const validationResult = validationSchema.safeParse(fitnessData);

		console.log(fitnessData);

		if (!validationResult.success) {
			return fail(400, {
				fitnessData,
				error: true,
				errorMessage: 'Si prega di compilare tutti i campi'
			});
		}

		const { error: supabaseUpdateError } = await supabase
			.from('profiles')
			.update({ fitness_data: fitnessData, updated_at: new Date().toISOString(), fitness_notes })
			.eq('id', userId);

		if (supabaseUpdateError) {
			throw error(500, { message: `Internal server error: ${supabaseUpdateError.message}` });
		}

		return { success: true };
	}
};
