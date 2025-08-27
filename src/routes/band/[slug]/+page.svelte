<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>This is the band page for {data.band?.name}</h1>

{#if data.band.ownerId == data.session?.profileId}
	<p>You are the owner of this band. <a href={`/band/edit/${data.band.slug}`}>Edit Band</a></p>
{/if}

<h2>Bio:</h2>
<p>{data.band?.description ?? 'Empty'}</p>

<h2>Members:</h2>
<ul>
	{#each data.band?.members as member}
		<li>{member.displayName}</li>
	{/each}
</ul>

<h2>Influences:</h2>
<ul>
	{#each data.band?.influences as influence}
		<li>{influence.name}</li>
	{/each}
</ul>

<a href="/bands">Back to Bands</a>