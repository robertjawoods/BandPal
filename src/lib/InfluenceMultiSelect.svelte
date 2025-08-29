<script lang="ts">
	import type { Influence } from '@prisma/client';
    
	interface Props {
        influences?: Influence[];
        onSelect: (influence: Influence) => void;
        onRemove: (influence: Influence) => void;
    }

	const { influences, onSelect, onRemove }: Props = $props();

	// Autocomplete state
	let influenceInput = $state('');
	let suggestions: Influence[] = $state([]);
	let showSuggestions = $state(false);
	let debounceTimeout: ReturnType<typeof setTimeout>;

	let selectedInfluences: Influence[] = $state([...(influences ?? [])]);
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

        onSelect(suggestion);

		influenceInput = '';
		suggestions = [];
		showSuggestions = false;
		highlighted = -1;
	}
</script>

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
			class="border-surface-200 dark:bg-surface-700 absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border bg-white shadow-lg"
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
				<span class="badge preset-filled flex items-center gap-1">
					{selectedInfluence.name}
					<button
						type="button"
						class="btn-xs btn-ghost text-error btn"
						title="Remove"
						onclick={() => {
                            selectedInfluences = selectedInfluences.filter(
                                (inf) => inf.id !== selectedInfluence.id
                            );

                            onRemove(selectedInfluence);
						}}>&times;</button
					>
					<input type="hidden" name="influences[]" value={selectedInfluence.id} />
				</span>
			{/each}
		</div>
	{/if}
</div>
