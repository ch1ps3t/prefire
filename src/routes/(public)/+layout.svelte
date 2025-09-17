<script lang="ts">
	import type { LayoutProps } from './$types';
	import '$lib/styles/app.css'; // Import the global Tailwind CSS from $lib/styles

	let { data, children }: LayoutProps = $props();
</script>

{@render children()}
