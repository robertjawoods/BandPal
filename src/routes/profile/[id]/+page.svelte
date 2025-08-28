<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container mx-auto max-w-2xl p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">{data.profile?.displayName}</h1>
		<a href="/profiles" class="btn-ghost btn">Back to Profiles</a>
	</div>

	{#if data.session?.profileId === data.profile?.id}
		<div class="alert alert-info mb-4">You are viewing your own profile.</div>
	{/if}

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Bio</h2>
		<p
			class="rounded-lg border border-surface-200 bg-white p-4 text-surface-700 shadow dark:bg-surface-800 dark:text-surface-200"
		>
			{data.profile?.bio ?? 'No bio available.'}
		</p>
	</div>

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Avatar</h2>
		{#if data.profile?.avatarUrl}
			<img
				src={data.profile.avatarUrl}
				alt="Avatar"
				class="h-32 w-32 rounded-full border-2 border-primary-400 object-cover"
			/>
		{:else}
			<div
				class="flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary-400 bg-surface-200 dark:bg-surface-700"
			>
				<span class="text-4xl font-bold text-surface-600 dark:text-surface-300"
					>{data.profile?.displayName?.[0] ?? '?'}</span
				>
			</div>
		{/if}
	</div>

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Influences</h2>
		{#if data.profile?.influences.length > 0}
			<ul class="flex flex-wrap gap-2">
				{#each data.profile.influences as influence}
					<li class="badge-lg badge-accent badge">{influence.name}</li>
				{/each}
			</ul>
		{:else}
			<p>No influences listed.</p>
		{/if}
	</div>

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Bands</h2>
		{#if data.profile?.bands.length > 0}
			<ul class="flex flex-wrap gap-2">
				{#each data.profile.bands as band}
					<li>
						<a href={`/band/${band.slug}`} class="badge-lg badge-primary badge">{band.name}</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p>This user is not a member of any bands.</p>
		{/if}
	</div>
</div>
