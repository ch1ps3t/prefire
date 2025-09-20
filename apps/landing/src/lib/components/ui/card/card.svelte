<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		'bg-background flex flex-col gap-6 rounded-lg border border-gray-800 py-8 shadow-[0_0_14px_rgba(255,230,255,0.05)] h-full',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
