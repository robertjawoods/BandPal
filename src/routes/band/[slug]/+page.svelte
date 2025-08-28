<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container mx-auto max-w-2xl p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">{data.band?.name}</h1>
		<a href="/bands" class="btn-ghost btn">Back to Bands</a>
	</div>

	{#if data.band.ownerId == data.session?.profileId}
		<div class="alert alert-info mb-4 flex items-center gap-2">
			<span>You are the owner of this band.</span>
			<a href={`/band/edit/${data.band.slug}`} class="btn-primary btn btn-sm">Edit Band</a>
		</div>
	{/if}

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Bio</h2>
		<p
			class="rounded-lg border border-surface-200 bg-white p-4 text-surface-700 shadow dark:bg-surface-800 dark:text-surface-200"
		>
			{data.band?.description ?? 'Empty'}
		</p>
	</div>

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Members</h2>
		<ul class="flex flex-wrap gap-2">
			{#each data.band?.members as member}
				<li class="badge-lg badge-secondary badge">{member.displayName}</li>
			{/each}
		</ul>
	</div>

	<div class="mb-6">
		<h2 class="mb-1 text-xl font-semibold">Influences</h2>
		<ul class="flex flex-wrap gap-2">
			{#each data.band?.influences as influence}
				<li class="badge-lg badge-accent badge">{influence.name}</li>
			{/each}
		</ul>
	</div>
</div>
