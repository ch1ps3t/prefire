<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// UI imports
	import { Button } from '$lib/components/ui/button';
	import GradientButton from '$lib/components/ui/GradientButton.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import * as Accordion from '$lib/components/ui/accordion/index';
	import { Switch } from '$lib/components/ui/switch/index';
	import * as Avatar from '$lib/components/ui/avatar/index';

	// Images
	import Logo from '$lib/assets/images/prefire-logo-white.png';
	import HeroImage from '$lib/assets/images/placeholder-cs2.webp';
	import SkinsImage from '$lib/assets/images/landing-knife.avif';
	import AboutImage from '$lib/assets/images/landing-train.avif';

	// Videos
	import Video from '$lib/assets/videos/landing-hero.mp4';

	let mobileMenuOpen = $state(false);

	// Pricing toggle
	let isQuarterly = $state(true);

	type Plan = {
		id: string | null;
		label: string | null;
		priceMonthly: any;
		pricesQuarterly: any;
		features: string[] | null;
		cta: string | null;
	};

	const plans: Plan[] = [
		{
			id: 'Standard',
			label: 'Standard',
			priceMonthly: 9.99,
			pricesQuarterly: 8.99,
			features: [
				'10 player slots',
				'1 spectator slot',
				'24/7 server',
				'Skill balancing',
				'All gamemodes',
				'All maps',
				'Skin changer support',
				'37 locations',
				'Admin panel'
			],
			cta: 'Get Standard Server'
		},
		{
			id: 'Creator',
			label: 'Creator',
			priceMonthly: 12.99,
			pricesQuarterly: 10.99,
			features: [
				'Twitch integration',
				'10 player slots',
				'1 spectator slot',
				'24/7 server',
				'Skill balancing',
				'All gamemodes',
				'All maps',
				'Skin changer support',
				'37 locations',
				'Admin panel'
			],
			cta: 'Get Server with Twitch Addon'
		},
		{
			id: 'Tournament',
			label: 'Tournament',
			priceMonthly: 'Coming soon',
			pricesQuarterly: 'Coming soon',
			features: [
				'2 spectator slots',
				'10 player slots',
				'2 coach slots',
				'2 analyst slots',
				'1 admin slot',
				'Custom HUD overlay',
				'24/7 server',
				'All maps',
				'Experimental anti-cheat',
				'37 locations',
				'Admin panel'
			],
			cta: ''
		}
	];

	function getDisplayedRaw(plan: Plan): unknown {
		return isQuarterly ? ((plan as any).pricesQuarterly ?? plan.priceMonthly) : plan.priceMonthly;
	}

	function isDisplayedPriceNumeric(plan: Plan): boolean {
		return typeof getDisplayedRaw(plan) === 'number';
	}

	function getDisplayedPriceString(plan: Plan): string {
		const value = getDisplayedRaw(plan) as unknown;
		if (typeof value === 'number') {
			// format to currency-like string, trimming trailing zeros
			const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
			return `€${formatted}`;
		}
		return String(value ?? '');
	}

	// Navbar hide/show on scroll
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
			// Keep navbar visible while mobile menu is open
			if (mobileMenuOpen) {
				hideNav = false;
				lastScrollY = current;
				return;
			}
			if (current < 100) {
				hideNav = false;
			} else if (current > lastScrollY) {
				// Scrolling down
				hideNav = true;
			} else if (current < lastScrollY) {
				// Scrolling up
				hideNav = false;
			}
			lastScrollY = current;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll as EventListener);
	});

	// Smooth scroll logic
	function smoothScroll(event: Event) {
		event.preventDefault();
		const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
		if (targetId && targetId.startsWith('#')) {
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const targetPosition =
					targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

				if (mobileMenuOpen) {
					mobileMenuOpen = false; // Close the menu immediately
					setTimeout(() => {
						window.scrollTo({
							top: targetPosition,
							behavior: 'smooth'
						});
					}, 300); // Delay scroll to allow menu to close
				} else {
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
				}
			}
		}
	}

	// Scroll to top
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<svelte:head>
	<title>Prefire CS2 Servers</title>
</svelte:head>

<!-- Navbar -->
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
					><img src={Logo} alt="CS2 Gathers" class="w-auto h-12" /></button
				>
			</div>

			<!-- Mobile menu button (small screens) -->
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

			<!-- Navigation Links -->
			<div class="hidden sm:flex sm:flex-grow sm:justify-end sm:space-x-6">
				<a
					href="#skins"
					onclick={smoothScroll}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>Skins</a
				>
				<a
					href="#servers"
					onclick={smoothScroll}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>Servers</a
				>
				<a
					href="#faq"
					onclick={smoothScroll}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>FAQ</a
				>
				<a
					href="#pricing"
					onclick={smoothScroll}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>Pricing</a
				>
				<a
					href="#about"
					onclick={smoothScroll}
					class="inline-flex transition-all duration-300 items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-white"
					>About</a
				>
			</div>

			<div class="hidden sm:ml-6 sm:flex sm:items-center text-sm">
				<!-- Start now Button -->
				<Button variant="default">Steam Login</Button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<!-- Mobile dropdown menu -->
			<div id="mobile-menu" class="sm:hidden pb-4 px-0">
				<div class="pt-2 space-y-1">
					<a
						href="#gamemodes"
						onclick={smoothScroll}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Gamemodes</a
					>
					<a
						href="#skins"
						onclick={smoothScroll}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Skins</a
					>
					<a
						href="#servers"
						onclick={smoothScroll}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Servers</a
					>
					<a
						href="#faq"
						onclick={smoothScroll}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>FAQ</a
					>
					<a
						href="#pricing"
						onclick={smoothScroll}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>Pricing</a
					>
					<a
						href="#about"
						onclick={smoothScroll}
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-800"
						>About</a
					>
				</div>
				<div class="mt-3">
					<GradientButton text="Login with Steam →" />
				</div>
			</div>
		{/if}
	</div>
</nav>

<!-- Hero Section -->
<main class="min-h-[568px] max-h-[1440px] px-0 mt-[82px] flex items-center mb-16 lg:mb-0">
	<div class="max-w-6xl mx-auto w-full px-8">
		<div class="grid grid-cols-1 lg:grid-cols-10 gap-10 items-center">
			<div class="text-left lg:col-span-4">
				<h1
					class="text-4xl sm:text-5xl font-medium leading-[1.1] text-center lg:text-left text-white mb-6"
				>
					Gathers<br /> Skins<br /> Scrims<br />Partymodes
				</h1>
				<p class="text-lg text-gray-500 mb-8 max-w-md lg:pr-6 text-center lg:text-left">
					Private CS2 servers for you and your friends with full skin changer support, hosted all
					over the world.
				</p>
				<GradientButton text="Get Started &rarr;" class="mx-auto lg:mx-0" />
			</div>
			<div
				class="flex items-center justify-center order-first md:order-none lg:col-span-6 rounded-md h-full"
			>
				<div class="relative rounded-md shadow-[0_0_60px_rgba(255,230,255,0.2)] mt-12 lg:mt-0">
					<video
						src={Video}
						poster={HeroImage}
						autoplay
						loop
						muted
						playsinline
						class="rounded-md w-full h-full object-cover"
					>
					</video>
				</div>
			</div>
		</div>
	</div>
</main>

<!-- Modes Section -->
<section class="py-16 lg:py-28 text-white">
	<div class="max-w-6xl mx-auto px-8">
		<h2 class="text-4xl font-medium text-center mb-12 lg:mb-16">The Beloved Gamemodes</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Competitive -->
			<Card.Root>
				<Card.Header>
					<svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
						><path
							fill="#717171"
							d="M5.885 21.02v-3.245q0-.467.232-.842q.233-.375.637-.593l4.669-2.398V11.29l-3.802 1.955q-.223.131-.477.177q-.253.046-.507.046q-.604 0-1.14-.317q-.537-.317-.83-.911q-.273-.535-.223-1.134t.379-1.096l3.004-4.625L6.25 2.981h4.77q2.901 0 4.921 2.073t2.02 5.062v10.903zm1.019-1h10.058v-9.904q0-2.557-1.734-4.346T11.02 3.98H8.135l.9 1.405l-3.383 5.192q-.183.277-.195.594t.126.616q.183.39.48.535q.298.145.578.145q.055 0 .528-.113l5.273-2.7v4.904L7.231 17.23q-.154.077-.24.221q-.087.144-.087.317zm4.519-8.731"
						/></svg
					>
					<Card.Title>Competitive</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>
						MR12 with unlimited overtime. Play 1v1, 2v2, up to 5v5. Available for Gathers, PUGs, and
						Scrims.
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Arms Race -->
			<Card.Root>
				<Card.Header>
					<svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
						><path
							fill="#717171"
							d="M57.592 16.545c-8.657.067-22.155 4.26-29.053 15.084c-4.284 6.724-5.297 14.397-4.742 21.459c1.11 14.124 7.61 26.712 14.314 34.482c63.365 73.435 131.837 144.758 204.698 213.62c-7.998 7.462-15.994 14.925-24.096 22.328l-35.598-32.133a135 135 0 0 0 5.051-11.596l-20.602-1.879C153.701 314.468 124.807 345.464 80 368l1.23 20.02a256 256 0 0 0 17.454-9.66l17.441 34.769c-25.25 21.202-63.434 50.785-89.564 71.371l23.77 5.557c29.94-23.589 59.263-47.63 88.08-72.008l-24.565-49.61c24.393-17.178 45.548-38.322 60.174-61.013l44.92 40.336A3127 3127 0 0 0 256 313.664a3127 3127 0 0 0 37.06 34.098l44.92-40.336c14.626 22.691 35.78 43.835 60.174 61.013l-24.564 49.61c28.816 24.378 58.138 48.42 88.08 72.008l23.77-5.557c-26.131-20.586-64.316-50.168-89.565-71.371l17.441-34.77a256 256 0 0 0 17.454 9.66L432 368c-44.807-22.536-73.7-53.532-87.564-90.09l-20.602 1.88a135 135 0 0 0 5.05 11.595l-35.597 32.133c-8.102-7.403-16.098-14.866-24.096-22.329C342.052 232.33 410.524 161.005 473.89 87.57c6.704-7.77 13.204-20.358 14.314-34.482c.555-7.062-.458-14.735-4.742-21.46c-6.898-10.824-20.396-15.016-29.053-15.083c-16.903-.132-36.847 15.177-40.178 19.053c-15.592 18.148-34.449 14.71-51.834 13.449c12.706 8.842 24.54 12.333 35.17 11.646s19.323-5.289 26.57-10.066c10.249-6.23 20.535-18.3 33.716-15.64c25.822 6.251 4.255 38.683 2.408 40.824C397.083 149.027 328.747 220.15 256 288.83C183.253 220.15 114.917 149.026 51.74 75.81c-1.847-2.141-23.414-34.573 2.408-40.825c13.18-2.66 23.467 9.412 33.715 15.641c7.248 4.777 15.94 9.38 26.57 10.066c10.63.687 22.465-2.804 35.17-11.646c-17.384 1.26-36.241 4.7-51.833-13.45c-3.33-3.875-23.275-19.184-40.178-19.052zM191.965 347.75c-15.63 13.954-31.506 27.755-47.498 41.482l8.097 16.743c17.823-15.254 35.506-30.598 52.883-46.133zm128.07 0l-13.482 12.092c17.377 15.535 35.06 30.88 52.883 46.133l8.097-16.743c-15.992-13.727-31.869-27.528-47.498-41.482"
						/></svg
					>
					<Card.Title>Arms Race</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>
						An arms race to the golden knife. The fastest player wins. Free for all up to 10
						players.
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Retakes -->
			<Card.Root>
				<Card.Header>
					<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
						><g fill="none" stroke="#717171" stroke-width="1.5"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m10.388 10.569l-1.59 6.682a6 6 0 0 0-.083.37a3 3 0 0 0 .195 1.686c.036.086.079.17.164.341c.056.113.084.169.097.212a.5.5 0 0 1-.39.632c-.045.008-.107.008-.232.008H4.528c-1.164 0-1.746 0-2.042-.382s-.155-.95.127-2.086l1.353-5.448a1.62 1.62 0 0 0-1.563-2.015a.404.404 0 0 1-.403-.406V7.59c0-2.465.511-2.979 2.96-2.979h13.208c.62 0 1.089-.146 1.595-.486c.591-.397 1.32-1.118 1.856-.115c.539 1.007.568 5.234-.316 6.124c-.433.436-1.131.436-2.527.436zm0 0h-1.48"
							/><path
								d="M9 14.5h.877c.95 0 1.426 0 1.843-.09a4 4 0 0 0 2.746-2.144c.188-.383.303-.844.534-1.766m-13-3h2.028c1.203 0 1.804 0 2.287-.299c.484-.298.753-.836 1.29-1.912L8 4.5"
							/><path stroke-linecap="round" d="M22 7.5h-3" /></g
						></svg
					>
					<Card.Title>Retakes</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>Classic Retake mode where CTs must retake the site from the defending Ts.</p>
				</Card.Content>
			</Card.Root>

			<!-- KZ -->
			<Card.Root>
				<Card.Header>
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
						><path
							fill="none"
							stroke="#717171"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="m14.524 17.649l3.513 1.84a.87.87 0 0 0 .941-.063a.9.9 0 0 0 .307-.392a.96.96 0 0 0 .053-.486l-.677-3.904a1 1 0 0 1 0-.434a.9.9 0 0 1 .233-.37l2.835-2.762a.93.93 0 0 0 .233-.92a.9.9 0 0 0-.72-.614l-3.925-.56a.92.92 0 0 1-.677-.498L14.884 4.91a.89.89 0 0 0-.783-.508a.84.84 0 0 0-.476.138a.8.8 0 0 0-.328.37l-1.799 3.576a.93.93 0 0 1-.666.498l-3.872.56a.93.93 0 0 0-.455.201a.87.87 0 0 0-.275.413a.95.95 0 0 0 .253.92L9.32 13.84q.155.161.233.37a1 1 0 0 1 0 .434l-.677 3.904a.86.86 0 0 0 0 .486a.9.9 0 0 0 .306.392a.87.87 0 0 0 .942.063l3.513-1.84a.9.9 0 0 1 .846 0zM8 5.4H2m3 12.07H2m1.5-5.773H2"
						/></svg
					>
					<Card.Title>KZ</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>Practice your movement or go for records. Custom KZ maps with skin changer support.</p>
				</Card.Content>
			</Card.Root>

			<!-- Surf -->
			<Card.Root>
				<Card.Header>
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
						><path
							fill="#717171"
							d="M7 13v7q0 .213-.144.356t-.357.144t-.356-.144T6 20V5.808q0-.343.232-.576T6.808 5h5.713q.29 0 .518.177t.284.47L13.593 7h4.6q.343 0 .575.23T19 7.8v6.4q0 .34-.232.57t-.576.23H14.48q-.29 0-.518-.177t-.284-.47L13.407 13zm7.65 1H18V8h-4.579q-.29 0-.518-.177t-.284-.47L12.35 6H7v6h6.579q.29 0 .518.177t.284.47zm-2.15-4"
						/></svg
					>
					<Card.Title>Surf</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>
						Play your favorite surf maps with your friends and your dream skins in a private server.
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Partymode -->
			<Card.Root>
				<Card.Header>
					<svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
						><path
							fill="none"
							stroke="#717171"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M31.815 5.5c.152.291.261.612.318.955c.292 1.782-.939 3.512-2.75 3.864"
						/><path
							fill="none"
							stroke="#717171"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M29.508 10.306a3.2 3.2 0 0 0-.98.236c-1.666.695-2.482 2.655-1.822 4.378m15.034 3.131c-.064.322-.18.64-.351.943c-.89 1.572-2.934 2.147-4.565 1.285"
						/><path
							fill="none"
							stroke="#717171"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M36.929 20.347a3.2 3.2 0 0 0-.91-.43c-1.735-.505-3.6.51-4.166 2.266m2.668 8.142l.11.109l-14.186 6.033L6.259 42.5l6.033-14.186l6.033-14.186"
						/><path
							fill="none"
							stroke="#717171"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m18.396 14.199l8.082 8.082l8.043 8.044M18.325 14.128l.07.07"
						/></svg
					>
					<Card.Title>Partymode</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>
						Fall guys, hide and seek, and the hilarious superhero mode where you spawn with random
						abilities.
					</p>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</section>

<!-- Skins Section -->
<section id="skins" class="py-16 lg:pt-20 lg:pb-28 text-white">
	<div class="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
		<div class="col-span-1">
			<h2 class="text-4xl font-medium text-center lg:text-left text-gray-200 mb-6">
				Skin Changer Support for All Gamemodes
			</h2>
		</div>
		<div class="col-span-1">
			<p class="text-md text-gray-500 text-center lg:text-left">
				Use your dream skins in your own private Prefire server. Skin changers are supported and
				fully secure on our servers.
			</p>
		</div>
		<div class="col-span-1 lg:col-span-2 h-[1px] bg-gray-800 mb-4 lg:mb-8"></div>
		<div class="col-span-1 lg:col-span-2">
			<img
				src={SkinsImage}
				alt="Placeholder"
				class="w-full h-full object-cover rounded-md shadow-[0_0_60px_rgba(255,230,255,0.2)]"
			/>
		</div>
	</div>
</section>

<!-- Servers Section -->
<section id="servers" class="py-16 lg:pt-20 lg:pb-28 text-white">
	<div class="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
		<div class="lg:col-span-1 space-y-6 flex flex-col">
			<h2 class="text-4xl font-medium leading-[1.1] text-center lg:text-left text-white mb-6">
				Flagship Skill Balancing System <br /> Cutting Edge Customizability
			</h2>
			<p class="text-md text-gray-500 font-medium text-center lg:text-left mb-8">
				Play on ready to go servers with click-and-play gamemodes and maps. Run scrims with set
				teams, pugs and gathers with auto teams, host KZ, surf, play retakes, or have fun with party
				games.
			</p>
			<div class="flex justify-center lg:justify-start space-x-8 mb-10">
				<div class="text-center">
					<p class="text-2xl font-bold text-white">1 Click</p>
					<p class="text-gray-500">Setup</p>
				</div>
				<div class="text-center">
					<p class="text-2xl font-bold text-white">37</p>
					<p class="text-gray-500">Locations</p>
				</div>
				<div class="text-center">
					<p class="text-2xl font-bold text-white">99.9%</p>
					<p class="text-gray-500">Uptime</p>
				</div>
			</div>
			<Button variant="default" class="mx-auto lg:mx-0 self-center lg:self-start"
				>Get Started &rarr;</Button
			>
		</div>
		<div class="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
			<!-- Feature Card 1 -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Worldwide</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-md text-gray-500">
						Choose a server from one of our 37 locations in Europe, North America, and Asia.
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Feature Card 2 -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Custom Maps</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-md text-gray-500">
						Choose any map from the CS2 map pool or pick any CS2 workshop map.
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Feature Card 3 -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Skill</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-md text-gray-500">
						PUGs and Gathers come with automated skill balancing from Leetify.
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Feature Card 4 -->
			<Card.Root>
				<Card.Header>
					<Card.Title>Affordable</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-md text-gray-500">
						Standard Prefire servers start at €9.99 per month. You can cancel anytime.
					</p>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section id="faq" class="py-16 lg:pt-20 lg:pb-28 text-white">
	<div class="max-w-6xl mx-auto px-8">
		<h2 class="text-4xl font-medium text-center mb-12 lg:mb-16">Frequently Asked Questions</h2>
		<Accordion.Root type="single" class="w-full" value="item-1">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>How does a skin changer work?</Accordion.Trigger>
				<Accordion.Content>
					<p class="font-medium text-gray-500">
						A skin changer is a 3rd party tool that allows you to change skins on the client side.
						VAC and other 3rd party anti-cheats will ban you when loading into their or an official
						Valve server. Prefire.gg servers do not ban you when playing on Prefire.gg private
						servers. Anyone playing on your Prefire.gg server can use them.
						<br />
						<br />
						*Prefire.gg does not endorse skin changers, users are responsible for their own actions.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>How do I moderate my server?</Accordion.Trigger>
				<Accordion.Content>
					<p class="font-medium text-gray-500">
						Prefire.gg servers always come with a spectator spot on the server for your own
						appointed admins. Anyone with admin permissions can kick players from your server and
						block them from joining again.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>What are the payment options?</Accordion.Trigger>
				<Accordion.Content>
					<p class="font-medium text-gray-500">
						Credit cards and debit cards through our vendor Stripe. Google Pay and Apple Pay are
						available. You can cancel anytime.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-4">
				<Accordion.Trigger>How does the Twitch integration work?</Accordion.Trigger>
				<Accordion.Content>
					<p class="font-medium text-gray-500">
						If your Twitch account is linked with your Prefire.gg account and you have Creator Mode
						enabled in settings, you will get additional server options for Gathers. You will be
						able to change "Player priority" to "None", "Subs priority" or "Subs only". This will
						require anyone joining your Gather to have their Twitch linked to their Prefire.gg
						account.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-5">
				<Accordion.Trigger>Can I upgrade my subscription?</Accordion.Trigger>
				<Accordion.Content>
					<p class="font-medium text-gray-500">
						Yes, you can upgrade your subscription at any time. You can upgrade from the Standard
						plan to the Creator plan or from the Creator plan to the Tournament plan when the
						Tournament plan becomes available.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-6">
				<Accordion.Trigger>How is my privacy protected?</Accordion.Trigger>
				<Accordion.Content>
					<p class="font-medium text-gray-500">
						We only use cookies to store your login session. Steam and Twitch logins are only used
						for authentication and Prefire.gg only gets access to your Steam and Twitch profile
						picture and your public username. We do not store personal data. We do not have access
						to your account.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-16 lg:pt-20 lg:pb-28 text-white">
	<div class="max-w-6xl mx-auto px-8">
		<h2 class="text-4xl font-medium text-center mb-6 lg:mb-8">Pricing</h2>
		<p class="text-md text-gray-500 font-medium text-center mb-8">
			Pick the plan that fits your needs. Save 10% by paying quarterly.
		</p>
		<div class="flex flex-row items-center gap-3 mb-10 justify-center">
			<p class="text-xs uppercase tracking-wider text-gray-500">
				Monthly &nbsp; / &nbsp; Quarterly
			</p>
			<Switch id="billing-cycle" class="ml-1" bind:checked={isQuarterly} />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each plans as plan}
				<Card.Root>
					<Card.Header class="flex items-start justify-between">
						<span class="text-md font-semibold tracking-wider py-1 text-gray-300">{plan.label}</span
						>
					</Card.Header>
					<Card.Content class="pb-4">
						<div class="mb-6">
							<p class="text-4xl font-semibold text-white">{getDisplayedPriceString(plan)}</p>
							{#if plan.label === 'Tournament'}
								<p class="text-sm text-gray-400 mt-1">To be announced</p>
							{:else if isDisplayedPriceNumeric(plan)}
								<p class="text-sm text-gray-400 mt-1">
									Per {isQuarterly === true
										? 'month billed quarterly'
										: isQuarterly === false
											? 'month'
											: 'To be announced'}
								</p>
							{/if}
						</div>
						<ul class="space-y-3 mt-6">
							{#each plan.features || [] as feat}
								<li class="flex items-start gap-3 text-gray-400">
									<span class="flex items-center gap-2">
										<svg
											width="16"
											height="16"
											viewBox="0 0 512 512"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="32"
												d="M416 128L192 384l-96-96"
											/></svg
										>
										{feat}</span
									>
								</li>
							{/each}
						</ul>
					</Card.Content>
					<Card.Footer>
						{#if plan.cta}
							<Button
								class="w-full h-11 bg-accent text-white hover:opacity-80 border border-gray-800"
								>{plan.cta}</Button
							>
						{:else}
							<Button
								class="w-full h-11 bg-gray-700 text-white hover:opacity-70 border border-gray-800"
								disabled>Not yet available</Button
							>
						{/if}
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>

<!-- About section -->
<section id="about" class="py-16 lg:pt-20 lg:pb-28 text-white">
	<div class="max-w-6xl mx-auto px-8">
		<h2 class="text-4xl font-medium mb-6 text-center lg:text-left">
			A Project Born out of Love for the Players
		</h2>
		<p class="text-md text-gray-500 max-w-4xl font-medium mr-auto lg:text-left mb-8">
			Prefire.gg was born out of passion for building stronger communities and balancing fun and
			skill. Our intention was to create a plug-and-play platform for creators to engage with their
			communities, hosting both competitive matches and casual party games. Prefire.gg was born to
			make the game fun for everyone.
		</p>
		<div class="mt-12 flex justify-center">
			<!-- Background -->
			<div
				class="w-full max-w-6xl aspect-[16/9] bg-cover bg-center bg-no-repeat rounded-lg flex items-center flex-col justify-center text-gray-500 shadow-[0_0_60px_rgba(255,230,255,0.2)]"
				style="background-image: url({AboutImage})"
			>
				<div
					class="bg-[rgba(0,0,0,0.33)] p-6 rounded-lg w-full h-full flex flex-col items-center justify-center"
				>
					<h4 class="text-4xl font-medium mb-6 mt-auto text-center text-white">
						Are you Ready to Make<br />Counter-Strike Fun?
					</h4>
					<GradientButton text="Join the Community" class="mb-12" />
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="py-16 lg:pt-20 lg:pb-28 text-white">
	<div class="max-w-6xl mx-auto px-8">
		<p class="text-center text-gray-500">
			Prefire.gg &copy; {new Date().getFullYear()}
		</p>
	</div>
</footer>