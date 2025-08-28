<!-- create edit band form -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Influence } from '@prisma/client';
	import type { PageProps } from './$types';

	const { data, form }: PageProps = $props();

	// Autocomplete state
	let influenceInput = $state('');
	let suggestions: Influence[] = $state([]);
	let showSuggestions = $state(false);
	let debounceTimeout: ReturnType<typeof setTimeout>;

	let selectedInfluences: Influence[] = $state([...data.band.influences]);
	let highlighted = $state(-1); // index of highlighted suggestion

	async function fetchSuggestions(query: string) {
		if (!query) {
			suggestions = [];
			showSuggestions = false;
			highlighted = -1;
			return;
		}
		const res = await fetch(`/api/influences?q=${encodeURIComponent(query)}`);
		if (res.ok) {
			// Filter out already selected influences
			const all = await res.json();
			suggestions = all.filter(
				(s: Influence) => !selectedInfluences.find((inf) => inf.id === s.id)
			);
			showSuggestions = suggestions.length > 0;
			highlighted = suggestions.length > 0 ? 0 : -1;
		} else {
			suggestions = [];
			showSuggestions = false;
			highlighted = -1;
		}
	}

	function onInfluenceInput(value: string) {
		if (debounceTimeout) clearTimeout(debounceTimeout);
		if (value) {
			debounceTimeout = setTimeout(() => {
				fetchSuggestions(influenceInput);
			}, 300);
		} else {
			suggestions = [];
			showSuggestions = false;
			highlighted = -1;
		}
	}

	function onInfluenceKeydown(e: KeyboardEvent) {
		if (!showSuggestions || suggestions.length === 0) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlighted = (highlighted + 1) % suggestions.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlighted = (highlighted - 1 + suggestions.length) % suggestions.length;
		} else if (e.key === 'Enter') {
			if (highlighted >= 0 && highlighted < suggestions.length) {
				e.preventDefault();
				selectSuggestion(suggestions[highlighted]);
			}
		} else if (e.key === 'Escape') {
			showSuggestions = false;
			highlighted = -1;
		}
	}

	function selectSuggestion(suggestion: Influence) {
		// Add to selected, clear input, hide suggestions
		if (!selectedInfluences.find((inf) => inf.id === suggestion.id)) {
			selectedInfluences = [...selectedInfluences, suggestion];
		}
		influenceInput = '';
		suggestions = [];
		showSuggestions = false;
		highlighted = -1;
	}
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
			<label for="influence" class="label label-text font-semibold">Influences</label>
			<input
				id="influence"
				type="text"
				bind:value={influenceInput}
				class="input-filled input w-full"
				autocomplete="off"
				oninput={(e) => onInfluenceInput((e.target as HTMLInputElement).value)}
				onkeydown={onInfluenceKeydown}
			/>

			{#if showSuggestions && suggestions.length > 0}
				<ul
					class="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border border-surface-200 bg-white shadow-lg dark:bg-surface-700"
				>
					{#each suggestions as suggestion, i}
						<li
							class="cursor-pointer px-2 py-1 transition-colors duration-100 {highlighted === i
								? 'bg-primary-100 dark:bg-primary-800'
								: 'hover:bg-primary-50 dark:hover:bg-primary-900'}"
						>
							<button
								type="button"
								class="w-full text-left"
								onclick={() => selectSuggestion(suggestion)}
								tabindex="-1">{suggestion.name}</button
							>
						</li>
					{/each}
				</ul>
			{/if}

			{#if selectedInfluences.length > 0}
				<div class="mt-2 flex flex-wrap gap-2">
					{#each selectedInfluences as selectedInfluence (selectedInfluence.id)}
						<span class="badge-lg badge-secondary badge flex items-center gap-1">
							{selectedInfluence.name}
							<button
								type="button"
								class="btn-xs btn-ghost text-error btn"
								title="Remove"
								onclick={() => {
									selectedInfluences = selectedInfluences.filter(
										(inf) => inf.id !== selectedInfluence.id
									);
								}}>&times;</button
							>
							<input type="hidden" name="influences[]" value={selectedInfluence.id} />
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<button type="submit" class="btn-primary btn w-full btn-lg">Save</button>
	</form>

	{#if form?.message}
		<p class="text-error mt-4 text-center font-semibold">
			{form.message}
		</p>
	{/if}
</div>
