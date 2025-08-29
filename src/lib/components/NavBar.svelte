<script lang="ts">
	export let data: any;
	// data.session, data.session.user, data.session.profile, etc.
</script>

<nav
	class="navbar mb-8 flex items-center justify-between bg-white px-4 py-3 shadow dark:bg-surface-800"
>
	<div class="flex flex-1 items-center">
		<a href="/" class="text-xl font-bold text-primary-600 dark:text-primary-300">BandPal</a>
	</div>
	<div class="flex flex-0 items-center justify-center gap-2">
		<a href="/bands" class="btn-ghost btn-md btn text-lg">Bands</a>
		<a href="/profiles" class="btn-ghost btn-md btn text-lg">Profiles</a>
	</div>
	<div class="flex flex-1 items-center justify-end gap-2">
		{#if data?.session}
			<a
				href='/profile/{data.session.profileId}'
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
						>{(data.session.profile?.displayName?.[0]).toUpper() ?? data.session.user?.email?.[0] ?? '?'}</span
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
</nav>
