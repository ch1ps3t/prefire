<script lang="ts">
	import type { LayoutProps } from './$types';
	import '$lib/styles/app.css'; // Import the global Tailwind CSS from $lib/styles
	import Navbar from '$lib/components/layout/Navbar.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<Navbar />

{@render children()}
