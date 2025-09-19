<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import GradientButton from '$lib/components/ui/GradientButton.svelte';
	import Logo from '$lib/assets/images/prefire-logo-white.avif';

	let mobileMenuOpen = $state(false);
	let hideNav = $state(false);
	let lastScrollY = $state(0);
	let navbarHeight = $state(0);

	$effect(() => {
		const navElement = document.querySelector('nav');
		if (navElement) {
			navbarHeight = navElement.offsetHeight;
		}

		const onScroll = () => {
			const current = window.scrollY || 0;
			if (mobileMenuOpen) {
				hideNav = false;
				lastScrollY = current;
				return;
			}
			if (current < 100) {
				hideNav = false;
			} else if (current > lastScrollY) {
				hideNav = true;
			} else if (current < lastScrollY) {
				hideNav = false;
			}
			lastScrollY = current;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll as EventListener);
	});

	function smoothScrollIfHome(event: Event) {
		const link = event.currentTarget as HTMLAnchorElement;
		const href = link.getAttribute('href') || '';
		// Only intercept on homepage and when href is an in-page anchor like '/#id'
		if (location.pathname === '/' && href.startsWith('/#')) {
			event.preventDefault();
			const targetId = href.slice(1); // '#id'
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const targetPosition =
					targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

				if (mobileMenuOpen) {
					mobileMenuOpen = false;
					setTimeout(() => {
						window.scrollTo({ top: targetPosition, behavior: 'smooth' });
					}, 300);
				} else {
					window.scrollTo({ top: targetPosition, behavior: 'smooth' });
				}
			}
		}
	}

	function scrollToTop() {
		if (location.pathname !== '/') {
			return; // allow navigation by default when used as <a> in future
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<nav
	class={'fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-background backdrop-blur transition-transform duration-300 transform-gpu ' +
		(hideNav ? '-translate-y-full' : 'translate-y-0')}
>
	<div class="max-w-6xl mx-auto py-2 px-8">
		<div class="flex items-center h-16">
			<div class="flex-shrink-0 flex items-center">
				<button
					onclick={scrollToTop}
					class="font-bold text-lg hover:opacity-70 cursor-pointer transition-all duration-300"
				>
					<img src={Logo} alt="CS2 Gathers" class="w-auto h-8" />
				</button>
			</div>

			<div class="ml-auto flex items-center sm:hidden">
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded={mobileMenuOpen}
				>
					<span class="sr-only">Toggle main menu</span>
					{#if mobileMenuOpen}
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#717171"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#717171"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</button>
			</div>

			<div class="hidden sm:flex sm:flex-grow sm:justify-end sm:space-x-6">
				<a
					href="/#skins"
					onclick={smoothScrollIfHome}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md text-center md:text-left font-medium text-gray-500 hover:text-white"
					>Skins</a
				>
				<a
					href="/#servers"
					onclick={smoothScrollIfHome}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>Servers</a
				>
				<a
					href="/#faq"
					onclick={smoothScrollIfHome}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>FAQ</a
				>
				<a
					href="/#pricing"
					onclick={smoothScrollIfHome}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>Pricing</a
				>
				<a
					href="/docs"
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>Docs</a
				>
			</div>

			<div class="hidden sm:ml-6 sm:flex sm:items-center text-sm">
				<Button variant="default" href="https://app.prefire.gg/login">Steam Login</Button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div id="mobile-menu" class="sm:hidden pb-4 px-0">
				<div class="pt-2 space-y-1 text-center">
					<a
						href="/#skins"
						onclick={smoothScrollIfHome}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Skins</a
					>
					<a
						href="/#servers"
						onclick={smoothScrollIfHome}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Servers</a
					>
					<a
						href="/#faq"
						onclick={smoothScrollIfHome}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>FAQ</a
					>
					<a
						href="/#pricing"
						onclick={smoothScrollIfHome}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Pricing</a
					>
					<a
						href="/#about"
						onclick={smoothScrollIfHome}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>About</a
					>
				</div>
				<div class="mt-3 text-center">
					<GradientButton text="Login with Steam →" href="https://app.prefire.gg/login" />
				</div>
			</div>
		{/if}
	</div>
</nav>
