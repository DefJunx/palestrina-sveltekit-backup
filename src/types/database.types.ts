export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			exercises: {
				Row: {
					created_at: string | null;
					id: number;
					photoUrl: string | null;
					videoUrl: string | null;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					photoUrl?: string | null;
					videoUrl?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					photoUrl?: string | null;
					videoUrl?: string | null;
				};
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					fitness_data: Json | null;
					full_name: string | null;
					has_compiled: boolean;
					id: string;
					updated_at: string | null;
					user_role: Database['public']['Enums']['user_role_enum'] | null;
					username: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					fitness_data?: Json | null;
					full_name?: string | null;
					has_compiled?: boolean;
					id: string;
					updated_at?: string | null;
					user_role?: Database['public']['Enums']['user_role_enum'] | null;
					username?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					fitness_data?: Json | null;
					full_name?: string | null;
					has_compiled?: boolean;
					id?: string;
					updated_at?: string | null;
					user_role?: Database['public']['Enums']['user_role_enum'] | null;
					username?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			user_role_enum: 'User' | 'Admin';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
