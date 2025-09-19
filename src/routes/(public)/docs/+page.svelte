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
