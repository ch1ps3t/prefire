<script lang="ts">
	import type { LayoutProps } from './$types';
	import '$lib/styles/app.css'; // Import the global Tailwind CSS from $lib/styles
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { initRevealOnScroll } from '$lib/lib/scrollReveal';

	onMount(() => {
		if (browser) initRevealOnScroll();
	});

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<meta property="og:site_name" content="Prefire.gg" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="theme-color" content="#0b0b0b" />
	<meta name="robots" content="index, follow" />
	<link rel="icon" href="/favicon.ico" sizes="any" />
</svelte:head>

<Navbar />
<div class="pt-[82px]">
	{@render children()}
</div>

<Footer />
