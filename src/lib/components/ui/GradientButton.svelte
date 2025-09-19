<script lang="ts">
	const {
		text,
		onClick,
		href,
		class: className
	} = $props<{ text: string; onClick?: () => void; href?: string; class?: string }>();

	function handleClick() {
		if (onClick) {
			onClick();
		}
	}
</script>

{#if href}
	<a
		{href}
		class="{className} inline-flex flex-row items-center rounded-md overflow-hidden hover:opacity-70 shadow-[0_0_5px_rgba(255,230,255,0.2)] cursor-pointer transition-all duration-300"
	>
		<div class="bg-[#fbac18] w-[20px] h-full min-h-[42px] rounded-l-md"></div>
		<div class="bg-[#ffffff] w-[8px] h-full min-h-[42px]"></div>
		<div
			class="bg-accent w-auto h-full min-h-[42px] text-sm px-6 text-center flex items-center rounded-r-md font-medium text-white"
		>
			{text}
		</div>
	</a>
{:else}
	<button
		onclick={handleClick}
		class="{className} inline-flex flex-row items-center rounded-md overflow-hidden hover:opacity-70 shadow-[0_0_5px_rgba(255,230,255,0.2)] cursor-pointer transition-all duration-300"
	>
		<div class="bg-[#fbac18] w-[20px] h-full min-h-[42px] rounded-l-md"></div>
		<div class="bg-[#ffffff] w-[8px] h-full min-h-[42px]"></div>
		<div
			class="bg-accent w-auto h-full min-h-[42px] text-sm px-6 text-center flex items-center rounded-r-md font-medium text-white"
		>
			{text}
		</div>
	</button>
{/if}
