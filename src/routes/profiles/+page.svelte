<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">Profiles</h1>
	{#if data.profiles.length > 0}
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.profiles as profile}
				<li>
					<a
						href="/profile/{profile.id}"
						class="relative block h-full min-h-[140px] rounded-lg border border-surface-200 bg-white p-4 font-medium shadow-sm transition-colors hover:bg-primary-50 dark:bg-surface-800 dark:hover:bg-primary-900"
					>
						<div class="mb-2 flex items-center justify-between">
							<span class="text-lg font-semibold">{profile.displayName}</span>
							<span
								class="avatar flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-primary-400 bg-surface-100 dark:bg-surface-700"
							>
								<Avatar imageUrl={profile.avatarUrl} displayName={profile.displayName} />
							</span>
						</div>
						<span class="line-clamp-2 text-sm text-surface-600 dark:text-surface-300"
							>{profile.bio ?? 'No bio.'}</span
						>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No profiles found.</p>
	{/if}
</div>
