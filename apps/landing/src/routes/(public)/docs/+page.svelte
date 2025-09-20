<script lang="ts">
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let { data }: PageProps = $props();

	function smoothToHash() {
		const hash = window.location.hash;
		if (!hash) return;
		const target = document.querySelector(hash);
		if (!target) return;
		const navH = (document.querySelector('nav') as HTMLElement | null)?.offsetHeight ?? 0;
		const top = target.getBoundingClientRect().top + window.scrollY - navH;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	onMount(smoothToHash);
	afterNavigate(smoothToHash);
</script>

<svelte:head>
	<title>Prefire.gg — Documentation</title>
</svelte:head>

<main class="max-w-6xl mx-auto px-8 text-white py-12">
	<h1 class="text-4xl font-semibold mb-6">Documentation</h1>
	<p class="text-gray-400 mb-8">Guides and references for using Prefire.gg.</p>

	<section id="twitch" class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Twitch integration</h2>
		<p class="text-gray-400">Details coming soon.</p>
	</section>

	<section id="skill-balancing" class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Skill balancing</h2>
		<p class="text-gray-400">Details coming soon.</p>
	</section>

	<section id="admin-panel" class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Admin panel</h2>
		<p class="text-gray-400">Details coming soon.</p>
	</section>
</main>
