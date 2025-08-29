<script lang="ts">
	import type { PageProps } from './$types';
	import InfluenceMultiSelect from '$lib/InfluenceMultiSelect.svelte';
	import type { Influence } from '@prisma/client';

	let { data }: PageProps = $props();
	let showCreate = $state(false);
	let filter = $state<'all' | 'looking' | 'not-looking' | 'my-bands'>('all');

	let selectedInfluences = $state<Influence[]>([]);

	const onSelect = (influence: Influence) => {
		if (!selectedInfluences.find((inf) => inf.id === influence.id)) {
			selectedInfluences = [...selectedInfluences, influence];
		}
	};

	const onRemove = (influence: Influence) => {
		selectedInfluences = selectedInfluences.filter((inf) => inf.id !== influence.id);
	};

	let filteredBands = $derived(() => {
		let filtered = data.bands;
		if (filter === 'looking') filtered = filtered.filter((b) => b.lookingForMembers);
		if (filter === 'not-looking') filtered = filtered.filter((b) => !b.lookingForMembers);
		if (filter === 'my-bands' && data.session) filtered = filtered.filter((b) => b.ownerId === data.session?.profileId);
		if (selectedInfluences.length > 0) {
			filtered = filtered.filter((band) =>
				selectedInfluences.every((inf) => band.influences?.some((bandInf) => bandInf.id === inf.id))
			);
		}
		return filtered;
	});
	$effect(() => console.info('🚀 ~ filteredBands:', filteredBands()));
</script>

<div class="container mx-auto p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold">Bands</h1>
		{#if data.session}
			<button class="btn-primary btn" onclick={() => (showCreate = !showCreate)}>
				{showCreate ? 'Cancel' : 'Create New Band'}
			</button>
		{/if}
	</div>

	{#if data.session && showCreate}
		<div class="mb-8">
			<form
				method="POST"
				action="?/createBand"
				class="border-surface-200 dark:bg-surface-800 flex items-end gap-2 rounded-lg border bg-white p-4 shadow"
			>
				<div class="form-control flex-1">
					<label for="bandName" class="label label-text font-semibold">Band Name</label>
					<input
						name="bandName"
						id="bandName"
						type="text"
						class="input-filled input w-full"
						required
					/>
				</div>
				<button class="btn-primary btn" type="submit">Create</button>
			</form>
		</div>
	{/if}

	<!-- Filter Bar -->
	<div class="mb-6 flex flex-wrap items-center gap-4">
		<label class="font-semibold" for="band-filter">Filter:</label>
		<select id="band-filter" class="select select-bordered" bind:value={filter}>
			<option value="all">All Bands</option>
			<option value="looking">Looking for Members</option>
			<option value="not-looking">Not Looking for Members</option>
			{#if data.session}
				<option value="my-bands">My Bands</option>
			{/if}
		</select>

		<!-- Influence MultiSelect Filter -->
		<div class="form-control w-full">
			<InfluenceMultiSelect influences={selectedInfluences} onSelect={onSelect} onRemove={onRemove}/>
		</div>
	</div>

	{#if filteredBands().length > 0}
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredBands() as band}
				<li>
					<a
						href="/band/{band.slug}"
						class="border-surface-200 hover:bg-primary-50 dark:bg-surface-800 dark:hover:bg-primary-900 relative block h-full min-h-[140px] rounded-lg border bg-white p-4 font-medium shadow-sm transition-colors"
					>
						{#if band.lookingForMembers !== undefined}
							<span class="absolute right-3 top-3 z-10">
								{#if band.lookingForMembers}
									<span class="badge-success badge-sm badge">Looking for members</span>
								{:else}
									<span class="badge-ghost badge-sm badge">Not looking for members</span>
								{/if}
							</span>
						{/if}
						<div class="flex flex-col gap-3">
							<span class="text-lg font-semibold">{band.name}</span>
							<span class="text-surface-600 dark:text-surface-300 line-clamp-2 text-sm"
								>{band.description ?? 'No description.'}</span
							>
							{#if band.influences?.length > 0}
								<div class="mt-1 flex flex-wrap gap-1">
									{#each band.influences.slice(0, 3) as influence}
										<span class="badge preset-filled ">{influence.name}</span>
									{/each}
								</div>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-surface-500 mt-6">No bands found.</p>
	{/if}
</div>
