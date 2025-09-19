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

<Navbar />
<div class="pt-[82px]">
	{@render children()}
</div>

<Footer />