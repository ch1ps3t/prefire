<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	style="min-height: 100vh; background: linear-gradient(90deg, #0b0d1c, #050505);
    color: white; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
>
	<div style="max-width: 768px; margin: 0 auto; padding: 48px 24px; text-align: center;">
		<!-- Error Code -->
		<h1
			style="font-size: 8rem; font-weight: bold; color: white; margin-bottom: 16px; line-height: 1; font-family: inherit;"
		>
			{$page.status}
		</h1>

		<!-- Error Message -->
		<h2
			style="font-size: 1.875rem; font-weight: 600; margin-bottom: 16px; line-height: 1.2; color: white;"
		>
			{$page.status === 404 ? 'Page Not Found' : 'Oops! Something went wrong'}
		</h2>

		<!-- Error Description -->
		<p style="color: #9ca3af; margin-bottom: 32px; font-size: 1.125rem; line-height: 1.6;">
			{#if $page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else if $page.status === 500}
				We're experiencing some technical difficulties. Please try again later.
			{:else}
				{$page.error?.message || 'An unexpected error occurred'}
			{/if}
		</p>

		<!-- Actions -->
		<div
			style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px;"
		>
			<a
				href="/"
				class="home-button"
				style="display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px; background: #242a5c; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; transition: all 0.3s; border: none; cursor: pointer; font-size: 1rem;"
			>
				Go Home
			</a>
		</div>
	</div>
</div>

<style>
	.home-button:hover {
		opacity: 0.7 !important;
	}
</style>
