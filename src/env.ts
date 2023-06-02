import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	clientPrefix: 'PUBLIC_',
	server: {
		DATABASE_URL: z.string().url()
	},
	client: {
		PUBLIC_SUPABASE_URL: z.string().url(),
		PUBLIC_SUPABASE_ANON_KEY: z.string()
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		PUBLIC_SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY: process.env.PUBLIC_SUPABASE_ANON_KEY
	}
});
