<script lang="ts">
	export let data: any;
	// data.session, data.session.user, data.session.profile, etc.
	let menuOpen = false;
</script>

<nav
	class="navbar mb-8 flex items-center justify-between bg-white px-4 py-3 shadow dark:bg-surface-800"
>
	<div class="flex flex-1 items-center">
		<a href="/" class="text-xl font-bold text-primary-600 dark:text-primary-300">BandPal</a>
	</div>
	<!-- Hamburger and profile for mobile -->
	<div class="flex items-center gap-2 md:hidden">
		{#if data?.session}
			<a
				href="/profile/{data.session.profileId}"
				class="avatar btn-ghost btn-md btn flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary-400 p-0"
				title="Profile"
			>
				{#if data.session.profile?.avatarUrl}
					<img
						src={data.session.profile.avatarUrl}
						alt="avatar"
						class="h-full w-full object-cover"
					/>
				{:else}
					<span class="text-xl font-bold uppercase"
						>{(data.session.profile?.displayName?.[0]).toUpper() ??
							data.session.user?.email?.[0] ??
							'?'}</span
					>
				{/if}
			</a>
		{/if}

		<button
			class="btn-ghost btn-md btn flex items-center justify-center"
			aria-label="Open menu"
			on:click={() => (menuOpen = !menuOpen)}
		>
			<svg
				class="h-7 w-7"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg>
		</button>
	</div>
	<!-- Desktop nav links -->
	<div class="hidden flex-0 items-center justify-center gap-2 md:flex">
		<a href="/bands" class="btn-ghost btn-md btn text-lg">Bands</a>
		<a href="/profiles" class="btn-ghost btn-md btn text-lg">Profiles</a>
	</div>
	<div class="hidden flex-1 items-center justify-end gap-2 md:flex">
		{#if data?.session}
			<a
				href="/profile/{data.session.profileId}"
				class="avatar btn-ghost btn-md btn flex h-12 placeholder w-12 items-center justify-center overflow-hidden rounded-full border-2 border-primary-400 p-0"
				title="Profile"
			>
				{#if data.session.profile?.avatarUrl}
					<img
						src={data.session.profile.avatarUrl}
						alt="avatar"
						class="h-full w-full object-cover"
					/>
				{:else}
					<span class="text-xl font-bold uppercase"
						>{(data.session.profile?.displayName?.[0]).toUpper() ??
							data.session.user?.email?.[0] ??
							'?'}</span
					>
				{/if}
			</a>
			<form method="POST" action="/signout" class="inline">
				<button class="btn-error btn-md ml-2 btn text-lg" type="submit">Log Out</button>
			</form>
		{:else}
			<a href="/signup" class="btn-primary btn-md btn text-lg">Sign Up</a>
			<a href="/signin" class="btn-ghost btn-md btn text-lg">Sign In</a>
		{/if}
	</div>
	<!-- Mobile menu -->
	{#if menuOpen}
		<div
			class="animate-fade-in absolute top-16 left-0 z-50 w-full bg-white shadow-md md:hidden dark:bg-surface-800"
		>
			<div class="flex flex-col items-center gap-2 py-4">
				<a
					href="/bands"
					class="btn-ghost btn-md btn w-11/12 text-lg"
					on:click={() => (menuOpen = false)}>Bands</a
				>
				<a
					href="/profiles"
					class="btn-ghost btn-md btn w-11/12 text-lg"
					on:click={() => (menuOpen = false)}>Profiles</a
				>
				{#if data?.session}
					<form method="POST" action="/signout" class="inline w-11/12">
						<button
							class="btn-error btn-md mt-2 btn w-full text-lg"
							type="submit"
							on:click={() => (menuOpen = false)}>Log Out</button
						>
					</form>
				{:else}
					<a
						href="/signup"
						class="btn-primary btn-md btn w-11/12 text-lg"
						on:click={() => (menuOpen = false)}>Sign Up</a
					>
					<a
						href="/signin"
						class="btn-ghost btn-md btn w-11/12 text-lg"
						on:click={() => (menuOpen = false)}>Sign In</a
					>
				{/if}
			</div>
		</div>
	{/if}
</nav>
