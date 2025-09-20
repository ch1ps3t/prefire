import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { POCKETBASE_URL } from '$env/static/private';

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// Get an up-to-date auth store state and log in the user if necessary
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		// Clear the auth store if it's invalid
		event.locals.pb.authStore.clear();
	}

	event.locals.user = structuredClone(event.locals.pb.authStore.model);

	const response = await resolve(event);

	// Send back the default 'pb_auth' cookie to the client with updated store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
}
