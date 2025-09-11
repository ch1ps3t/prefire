<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// UI imports
	import { Button, buttonVariants } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>CS2 Gathers</title>
</svelte:head>

<div
	class="min-h-[568px] h-[75vh] max-h-[1080px] flex items-center justify-center px-4 sm:px-6 lg:px-8"
>
	<div class="max-w-7xl mx-auto w-full">
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10 gap-8 items-center">
			<div class="text-left xl:col-span-3">
				<h1 class="text-5xl sm:text-6xl font-bold leading-tight text-white mb-4">
					Pugs<br />Gathers<br /> Scrims<br />Partymodes
				</h1>
				<p class="text-lg text-gray-300 mb-8 max-w-md">CS2 servers for you and your friends.</p>
				<a href="/dashboard" class={buttonVariants({ variant: 'outline' })}>Login with Steam</a>
			</div>
			<div
				class="bg-gray-100 aspect-square flex items-center justify-center rounded-lg shadow-inner xl:col-span-7"
			>
			</div>
		</div>
	</div>
</div>
