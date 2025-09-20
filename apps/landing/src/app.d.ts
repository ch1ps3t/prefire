// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import PocketBase from 'pocketbase';
import type { Record } from 'pocketbase'; // Import Record type

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: Record | null; // Or a more specific type if you know your user schema
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
