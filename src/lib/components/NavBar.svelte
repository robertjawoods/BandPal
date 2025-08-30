<script lang="ts">
	export let data: any;
	// data.session, data.session.user, data.session.profile, etc.
	let menuOpen = false;
</script>

<nav class="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
	<div class="flex items-center gap-3 flex-1">
		<a href="/" class="flex items-center gap-2 group">
			<!-- <img src="/favicon.svg" alt="BandPal logo" class="w-10 h-10 drop-shadow-lg group-hover:scale-110 transition-transform" /> -->
			<span class="text-2xl font-extrabold tracking-tight text-white drop-shadow-xl group-hover:text-purple-300 transition-colors">BandPal</span>
		</a>
	</div>
	<!-- Hamburger and profile for mobile -->
	<div class="flex items-center gap-2 md:hidden">
		{#if data?.session}
			<a
				href="/profile/{data.session.profileId}"
				class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-purple-400 bg-white/10 p-0 shadow"
				title="Profile"
			>
				{#if data.session.profile?.avatarUrl}
					<img
						src={data.session.profile.avatarUrl}
						alt="avatar"
						class="h-full w-full object-cover"
					/>
				{:else}
					<span class="text-xl font-bold uppercase text-white">
						{(data.session.profile?.displayName?.[0]).toUpper() ?? data.session.user?.email?.[0] ?? '?'}
					</span>
				{/if}
			</a>
		{/if}
		<button
			class="text-white hover:text-purple-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
			aria-label="Open menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>
	<!-- Desktop nav links -->
	<div class="hidden md:flex gap-4 items-center flex-0">
		<a href="/bands" class="text-white/90 hover:text-purple-200 font-semibold px-3 py-2 rounded transition-colors">Bands</a>
		<a href="/profiles" class="text-white/90 hover:text-purple-200 font-semibold px-3 py-2 rounded transition-colors">Musicians</a>
	</div>
	<div class="hidden md:flex gap-2 items-center flex-1 justify-end">
		{#if data?.session}
			<a
				href="/profile/{data.session.profileId}"
				class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-purple-400 bg-white/10 p-0 shadow"
				title="Profile"
			>
				{#if data.session.profile?.avatarUrl}
					<img
						src={data.session.profile.avatarUrl}
						alt="avatar"
						class="h-full w-full object-cover"
					/>
				{:else}
					<span class="text-xl font-bold uppercase text-white">
						{(data.session.profile?.displayName?.[0]).toUpper() ?? data.session.user?.email?.[0] ?? '?'}
					</span>
				{/if}
			</a>
			<form method="POST" action="/signout" class="inline">
				<button class="ml-2 px-4 py-2 rounded-lg font-semibold shadow bg-red-600 hover:bg-red-500 text-white border border-red-400 transition-colors" type="submit">Log Out</button>
			</form>
		{:else}
			<a href="/signup" class="px-5 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 hover:bg-purple-100 border border-purple-300 transition-colors">Sign Up</a>
			<a href="/signin" class="px-5 py-2 rounded-lg font-semibold shadow bg-purple-600 hover:bg-purple-500 text-white border border-purple-400 transition-colors">Sign In</a>
		{/if}
	</div>
	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="animate-fade-in absolute top-16 left-0 z-50 w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 shadow-md md:hidden">
			<div class="flex flex-col items-center gap-2 py-4">
				<a href="/bands" class="text-white/90 hover:text-purple-200 font-semibold w-11/12 px-4 py-2 rounded transition-colors" onclick={() => (menuOpen = false)}>Bands</a>
				<a href="/profiles" class="text-white/90 hover:text-purple-200 font-semibold w-11/12 px-4 py-2 rounded transition-colors" onclick={() => (menuOpen = false)}>Musicians</a>
				{#if data?.session}
					<form method="POST" action="/signout" class="inline w-11/12">
						<button class="mt-2 px-4 py-2 rounded-lg font-semibold shadow bg-red-600 hover:bg-red-500 text-white border border-red-400 transition-colors w-full" type="submit" onclick={() => (menuOpen = false)}>Log Out</button>
					</form>
				{:else}
					<a href="/signup" class="px-4 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 hover:bg-purple-100 border border-purple-300 transition-colors w-11/12 mb-1" onclick={() => (menuOpen = false)}>Sign Up</a>
					<a href="/signin" class="px-4 py-2 rounded-lg font-semibold shadow bg-purple-600 hover:bg-purple-500 text-white border border-purple-400 transition-colors w-11/12" onclick={() => (menuOpen = false)}>Sign In</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>
