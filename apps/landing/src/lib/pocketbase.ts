import { POCKETBASE_URL } from '$env/static/private';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// Replace with your PocketBase server URL
export const pb = new PocketBase(POCKETBASE_URL);

// Optional: Svelte store for user data if you plan to use authentication
export const currentUser = writable(pb.authStore.model);

// Optional: Listen for auth changes and update the store
pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});
