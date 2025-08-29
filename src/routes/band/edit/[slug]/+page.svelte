<!-- create edit band form -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import InfluenceMultiSelect from '$lib/InfluenceMultiSelect.svelte';
	import type { PageProps } from './$types';

	const { data, form }: PageProps = $props();

</script>

<div class="container mx-auto max-w-xl p-6">
	<h1 class="mb-6 text-center text-3xl font-bold">Edit Band: {data.band?.name}</h1>

	<form
		method="POST"
		use:enhance
		action="?/editBand"
		class="space-y-6 rounded-xl border border-surface-200 bg-white p-6 shadow-lg dark:bg-surface-800"
	>
		<input type="hidden" name="id" value={data.band?.id} />

		<div class="form-control w-full">
			<label for="bandName" class="label label-text font-semibold">Band name</label>
			<input
				id="bandName"
				name="bandName"
				type="text"
				required
				class="input-filled input-lg input w-full"
				value={data.band.name}
			/>
		</div>

		<div class="form-control w-full">
			<label for="description" class="label label-text font-semibold">Description</label>
			<textarea
				id="description"
				name="description"
				class="textarea-filled textarea-lg textarea w-full"
				bind:value={data.band.description}
			></textarea>
		</div>

		<!-- Autocomplete Influence -->
		<div class="form-control relative w-full">
			<InfluenceMultiSelect influences={data.band.influences} onSelect={() => {}} onRemove={() => {}} />
		</div>

		<button type="submit" class="btn-primary btn w-full btn-lg">Save</button>
	</form>

	{#if form?.message}
		<p class="text-error mt-4 text-center font-semibold">
			{form.message}
		</p>
	{/if}
</div>
