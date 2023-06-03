import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleLoginRedirect(event: RequestEvent) {
	const redirectTo = event.url.pathname + event.url.search;

	return `/?redirectTo=${redirectTo}`;
}

export function getAvatarFallbackfromName(fullName: string) {
	const nameParts = fullName.split(' ');
	const initials = nameParts.map((part: string) => part.charAt(0).toUpperCase());
	return initials.join('');
}

export async function getAvatarUrl(supabase: SupabaseClient, avatarPath: string) {
	try {
		const { data: avatarUrl } = await supabase.storage.from('avatars').getPublicUrl(avatarPath);
		return avatarUrl.publicUrl;
	} catch (error) {
		console.error(error);
		return '';
	}
}
