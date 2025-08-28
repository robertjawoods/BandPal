<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let showCreate = $state(false);
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
				class="flex items-end gap-2 rounded-lg border border-surface-200 bg-white p-4 shadow dark:bg-surface-800"
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

	{#if data.bands.length > 0}
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.bands as band}
				<li>
					<a
						href="/band/{band.slug}"
						class="relative block h-full min-h-[140px] rounded-lg border border-surface-200 bg-white p-4 font-medium shadow-sm transition-colors hover:bg-primary-50 dark:bg-surface-800 dark:hover:bg-primary-900"
					>
						{#if band.lookingForMembers !== undefined}
							<span class="absolute top-3 right-3 z-10">
								{#if band.lookingForMembers}
									<span class="badge-success badge-sm badge">Looking for members</span>
								{:else}
									<span class="badge-ghost badge-sm badge">Not looking for members</span>
								{/if}
							</span>
						{/if}
						<div class="flex flex-col gap-1">
							<span class="text-lg font-semibold">{band.name}</span>
							<span class="line-clamp-2 text-sm text-surface-600 dark:text-surface-300"
								>{band.description ?? 'No description.'}</span
							>
							{#if band.influences?.length > 0}
								<div class="mt-1 flex flex-wrap gap-1">
									{#each band.influences.slice(0, 3) as influence}
										<span class="badge-accent badge-sm badge">{influence.name}</span>
									{/each}
								</div>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="mt-6 text-surface-500">No bands found.</p>
	{/if}
</div>
