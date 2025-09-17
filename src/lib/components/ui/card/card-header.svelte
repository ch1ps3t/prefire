<script lang="ts">
	import { cn, type WithElementRef } from "$lib/lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-header"
	class={cn(
		"@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] text-gray-200 text-xl font-semibold [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-8",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
