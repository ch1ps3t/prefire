<script lang="ts">
	import Logo from '$lib/assets/images/prefire-logo-white.avif';
	const currentYear = new Date().getFullYear();

	function smoothScrollIfHome(event: Event) {
		const link = event.currentTarget as HTMLAnchorElement;
		const href = link.getAttribute('href') || '';
		if (location.pathname === '/' && href.startsWith('/#')) {
			event.preventDefault();
			const targetId = href.slice(1);
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const navEl = document.querySelector('nav') as HTMLElement | null;
				const navH = navEl?.offsetHeight ?? 0;
				const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - navH;
				window.scrollTo({ top: targetTop, behavior: 'smooth' });
			}
		}
	}
</script>

<!-- Footer -->
<footer class="border-t border-gray-800 bg-background text-white">
	<div class="max-w-6xl mx-auto px-8 py-12">
		<!-- Nav links -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Docs -->
			<div class="space-y-6 text-center md:text-left lg:text-left">
				<h2 class="text-xl capitalize tracking-wider text-gray-400">Docs</h2>
				<ul class="space-y-2 text-md transition-duration-300 md:text-left">
					<li>
						<a href="/docs/#twitch" class="text-gray-400 hover:text-white transition-colors"
							>Setup</a
						>
					</li>
					<li>
						<a href="/docs/#twitch" class="text-gray-400 hover:text-white transition-colors"
							>Twitch integration</a
						>
					</li>
					<li>
						<a
							href="/docs/#skill-balancing"
							class="text-gray-400 hover:text-white transition-colors"
						>
							Skill balancing</a
						>
					</li>
					<li>
						<a href="/docs/#admin-panel" class="text-gray-400 hover:text-white transition-colors"
							>Admin panel</a
						>
					</li>
				</ul>
			</div>
			<!-- Service -->
			<div class="space-y-6 text-center md:text-left lg:text-left">
				<h2 class="text-xl capitalize tracking-wider text-gray-400">Service</h2>
				<ul class="space-y-2 text-md transition-duration-300 text-center md:text-left lg:text-left">
					<li>
						<a
							href="https://app.prefire.gg/login"
							class="text-gray-400 hover:text-white transition-colors">Sign in</a
						>
					</li>
					<li>
						<a
							href="/#pricing"
							onclick={smoothScrollIfHome}
							class="text-gray-400 hover:text-white transition-colors">Pricing</a
						>
					</li>
					<li>
						<a
							href="/#faq"
							onclick={smoothScrollIfHome}
							class="text-gray-400 hover:text-white transition-colors">FAQ</a
						>
					</li>
					<li>
						<a href="/tournaments" class="text-gray-400 hover:text-white transition-colors"
							>Tournaments</a
						>
					</li>
				</ul>
			</div>
			<!-- Company -->
			<div class="space-y-6 text-center md:text-left lg:text-left">
				<h2 class="text-xl capitalize tracking-wider text-gray-400">Company</h2>
				<ul class="space-y-2 text-md transition-duration-300 md:text-left">
					<li>
						<a
							href="/company/#partnering"
							onclick={smoothScrollIfHome}
							class="text-gray-400 hover:text-white transition-colors">Partnering</a
						>
					</li>
					<li>
						<a
							href="/company/#contact"
							onclick={smoothScrollIfHome}
							class="text-gray-400 hover:text-white transition-colors">Contact</a
						>
					</li>
					<li>
						<a href="/policies/#privacy" class="text-gray-400 hover:text-white transition-colors"
							>Privacy Policy</a
						>
					</li>
				</ul>
			</div>
			<div
				class="md:col-span-1 flex justify-center md:justify-start md:items-end lg:justify-end lg:text-left"
			>
				<div class="flex items-center gap-4">
					<a
						href="https://www.x.com/"
						target="_blank"
						rel="noreferrer"
						aria-label="X"
						class="text-gray-400 hover:text-white transition-colors"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							><path
								fill="currentColor"
								d="m17.687 3.063l-4.996 5.711l-4.32-5.711H2.112l7.477 9.776l-7.086 8.099h3.034l5.469-6.25l4.78 6.25h6.102l-7.794-10.304l6.625-7.571zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34z"
							/></svg
						>
					</a>
					<a
						href="https://www.youtube.com/"
						target="_blank"
						rel="noreferrer"
						aria-label="YouTube"
						class="text-gray-400 hover:text-white transition-colors"
					>
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M23 12s0-3.5-.45-5.15c-.25-.96-.98-1.72-1.93-1.98C18.96 4.3 12 4.3 12 4.3s-6.96 0-8.62.57A2.75 2.75 0 0 0 1.45 6.85C1 8.5 1 12 1 12s0 3.5.45 5.15c.25.96.98 1.72 1.93 1.98C5.04 19.7 12 19.7 12 19.7s6.96 0 8.62-.57c.95-.26 1.68-1.02 1.93-1.98C23 15.5 23 12 23 12Z"
								stroke="currentColor"
								stroke-width="1.5"
							/>
							<path d="M10 15.2V8.8L15.2 12L10 15.2Z" fill="currentColor" />
						</svg>
					</a>
				</div>
			</div>
		</div>

		<div class="w-full h-px bg-gray-800 my-10"></div>

		<!-- Disclaimer + logo -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<p class="md:col-span-2 text-sm text-gray-400 leading-relaxed">
				Prefire.gg is a community gaming platform and is not affiliated with Valve Corporation. Use
				of any third‑party tools is at your own risk. Gameplay on Prefire.gg private servers does
				not affect official matchmaking accounts.
			</p>
			<a
				class="flex justify-center md:justify-end cursor-pointer hover:opacity-70 transition-all duration-300"
				href="/"
			>
				<img src={Logo} alt="Prefire" class="h-10 sm:h-12 lg:h-14 w-auto opacity-90" />
			</a>
		</div>

		<div
			class="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400"
		>
			<p class="order-2 sm:order-1">© {currentYear} Prefire.gg</p>
			<div class="order-1 sm:order-2 flex items-center gap-6">
				<a href="/policies/#privacy" class="hover:text-white transition-colors">Privacy Policy</a>
				<a href="/policies/#conditions" class="hover:text-white transition-colors"
					>Terms of Service</a
				>
			</div>
		</div>
	</div>
</footer>
