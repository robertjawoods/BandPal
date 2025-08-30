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

<div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-10 px-2 text-white">
	<div class="max-w-6xl mx-auto">
		<div class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<h1 class="text-4xl font-extrabold tracking-tight drop-shadow-xl">Bands</h1>
			{#if data.session}
				<button class="btn btn-primary px-6 py-3 rounded-lg text-lg font-semibold shadow-lg bg-purple-600 hover:bg-purple-500 transition-colors" onclick={() => (showCreate = !showCreate)}>
					{showCreate ? 'Cancel' : 'Create New Band'}
				</button>
			{/if}
		</div>

		{#if data.session && showCreate}
			<div class="mb-10">
				<form
					method="POST"
					action="?/createBand"
					class="flex flex-col sm:flex-row items-end gap-4 rounded-xl bg-white/10 p-6 shadow-lg border border-purple-300"
				>
					<div class="form-control flex-1">
						<label for="bandName" class="label label-text font-semibold text-white">Band Name</label>
						<input
							name="bandName"
							id="bandName"
							type="text"
							class="input input-filled w-full bg-white/80 text-gray-900 placeholder:text-gray-400"
							required
						/>
					</div>
					<button class="btn btn-primary px-6 py-2 rounded-lg font-semibold shadow bg-purple-600 hover:bg-purple-500 text-white border border-purple-400 transition-colors" type="submit">Create</button>
				</form>
			</div>
		{/if}

		<!-- Filter Bar -->
		<div class="mb-10 flex flex-col md:flex-row md:items-center gap-6 bg-white/10 rounded-xl p-6 shadow">
			<div class="flex flex-wrap gap-2 items-center" role="group" aria-label="Band filter">
				<span class="font-semibold text-white mr-2">Filter:</span>
				<button
					type="button"
					class="px-4 py-2 rounded-full font-semibold border border-purple-300 bg-purple-700/70 hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 {filter === 'all' ? 'ring-2 ring-purple-300 bg-purple-500' : ''}"
					aria-pressed={filter === 'all'}
					onclick={() => filter = 'all'}
				>
					All Bands
				</button>
				<button
					type="button"
					class="px-4 py-2 rounded-full font-semibold border border-purple-300 bg-purple-700/70 hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 {filter === 'looking' ? 'ring-2 ring-purple-300 bg-purple-500' : ''}"
					aria-pressed={filter === 'looking'}
					onclick={() => filter = 'looking'}
				>
					Looking for Members
				</button>
				<button
					type="button"
					class="px-4 py-2 rounded-full font-semibold border border-purple-300 bg-purple-700/70 hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 {filter === 'not-looking' ? 'ring-2 ring-purple-300 bg-purple-500' : ''}"
					aria-pressed={filter === 'not-looking'}
					onclick={() => filter = 'not-looking'}
				>
					Not Looking for Members
				</button>
				{#if data.session}
					<button
						type="button"
						class="px-4 py-2 rounded-full font-semibold border border-purple-300 bg-purple-700/70 hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 {filter === 'my-bands' ? 'ring-2 ring-purple-300 bg-purple-500' : ''}"
						aria-pressed={filter === 'my-bands'}
						onclick={() => filter = 'my-bands'}
					>
						My Bands
					</button>
				{/if}
			</div>
			<!-- Influence MultiSelect Filter -->
			<div class="form-control w-full md:w-auto">
				<InfluenceMultiSelect influences={selectedInfluences} onSelect={onSelect} onRemove={onRemove}/>
			</div>
		</div>

		{#if filteredBands().length > 0}
			<ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each filteredBands() as band}
					<li>
						<a
							href="/band/{band.slug}"
							class="relative block h-full min-h-[160px] rounded-2xl border border-purple-300 bg-white/10 p-6 pt-12 font-medium shadow-lg hover:scale-[1.025] hover:bg-purple-800/30 transition-all"
						>
							{#if band.lookingForMembers !== undefined}
								<span class="absolute top-4 right-4 z-10">
									<span
										class="inline-block h-5 w-5 rounded-full border-2 border-white shadow"
										style="background-color: {band.lookingForMembers ? '#22c55e' : '#ef4444'}"
										title={band.lookingForMembers ? 'Looking for members' : 'Not looking for members'}
									></span>
								</span>
							{/if}
							<div class="flex flex-col gap-3">
								<span class="text-xl font-bold text-white drop-shadow">{band.name}</span>
								<span class="text-indigo-100 line-clamp-2 text-sm">{band.description ?? 'No description.'}</span>
								{#if band.influences?.length > 0}
									<div class="mt-1 flex flex-wrap gap-2">
										{#each band.influences.slice(0, 3) as influence}
											<span class="bg-purple-600/80 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">{influence.name}</span>
										{/each}
									</div>
								{/if}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-indigo-200 mt-10 text-lg text-center">No bands found.</p>
		{/if}
	</div>
</div>
