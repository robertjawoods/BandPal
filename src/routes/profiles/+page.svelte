<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-10 px-2 text-white">
	<div class="max-w-6xl mx-auto">
		<h1 class="mb-10 text-4xl font-extrabold tracking-tight drop-shadow-xl">Profiles</h1>
		{#if data.profiles.length > 0}
			<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each data.profiles as profile}
					<li>
						<a
							href="/profile/{profile.id}"
							class="relative block h-full min-h-[160px] rounded-2xl border border-purple-300 bg-white/10 p-6 font-medium shadow-lg hover:scale-[1.025] hover:bg-purple-800/30 transition-all"
						>
							<div class="mb-4 flex items-center justify-between gap-2">
								<span class="text-xl font-bold text-white drop-shadow">{profile.displayName}</span>
								<span
									class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-purple-400 bg-white/20 shadow"
								>
									<Avatar imageUrl={profile.avatarUrl} displayName={profile.displayName} />
								</span>
							</div>
							<span class="line-clamp-2 text-sm text-indigo-100">{profile.bio ?? 'No bio.'}</span>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-indigo-200 mt-10 text-lg text-center">No profiles found.</p>
		{/if}
	</div>
</div>
