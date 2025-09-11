<script lang="ts">
	// Navbar component
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<nav class="bg-white shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex">
				<div class="flex-shrink-0 flex items-center">
					<!-- Logo Placeholder -->
					<span class="font-bold text-lg">[Logo Placeholder]</span>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<!-- Navigation Links -->
					<a
						href="#"
						class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
						>Platform</a
					>
					<a
						href="#"
						class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
						>Use cases</a
					>
					<a
						href="#"
						class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
						>Developers</a
					>
					<a
						href="#"
						class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
						>Resources</a
					>
				</div>
			</div>
			<div class="hidden sm:ml-6 sm:flex sm:items-center">
				<!-- Login Button -->
				<a href="#" class="text-sm font-medium text-gray-900 mr-4">Login</a>
				<!-- Start now Button -->
				<a href="#" class={buttonVariants({ variant: 'outline' })}>
					<span>Start now</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 ml-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</nav>
