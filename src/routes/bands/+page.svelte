<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>This is the bands page</h1>

<a href="/">Home</a>

<p>{data.session ? `Logged in as ${data.session.user?.email}` : 'Not logged in'}</p>

{#if data.session}
	<form method="POST" action="?/createBand">
		<label>
			Band Name:
			<input name="bandName" type="text" />
		</label>

		<button>Create</button>
	</form>
{/if}

{#if data.bands.length > 0}
	<h2>Your Bands</h2>
	<ul>
		{#each data.bands as band}
			<li>
				<a href="/band/{band.slug}">{band.name}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No bands found.</p>
{/if}
