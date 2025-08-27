<!-- create edit band form -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	// $page.form will contain { success, message } or { message } from fail()

</script>
<h1>Edit Band: {data.band?.name}</h1>
<form method="POST" use:enhance action="?/editBand">
	<input type="hidden" name="id" value={data.band?.id} />

	<div>
		<label for="bandName">Band name</label>
		<input id="bandName" name="bandName" type="text" required class="rounded border px-2 py-1"  value={data.band.name}/>
	</div>

	<div>
		<label for="description">Description</label>
		<textarea id="description" name="description" class="rounded border px-2 py-1" value={data.band.description}></textarea>
	</div>

	<button type="submit" class="rounded bg-blue-500 px-3 py-1 text-white"> Save </button>
</form>

{#if form?.message}
	<p class={'mt-2 text-red-600'}>
		{form.message}
	</p>
{/if}
