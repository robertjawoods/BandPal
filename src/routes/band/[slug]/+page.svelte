<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-10 px-2 text-white">
	<div class="max-w-2xl mx-auto">
		<div class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<h1 class="text-4xl font-extrabold tracking-tight drop-shadow-xl">{data.band?.name}</h1>
			<a href="/bands" class="btn btn-secondary px-5 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 hover:bg-purple-100 border border-purple-300 transition-colors">Back to Bands</a>
		</div>

		{#if data.band.ownerId == data.session?.profileId}
			<div class="mb-6 flex items-center gap-3 rounded-xl bg-purple-700/20 p-4 shadow border border-purple-400">
				<span class="font-semibold text-purple-200">You are the owner of this band.</span>
				<a href={`/band/edit/${data.band.slug}`} class="btn btn-primary btn-sm px-4 py-2 rounded-lg font-semibold shadow bg-purple-600 hover:bg-purple-500 text-white border border-purple-400 transition-colors">Edit Band</a>
			</div>
		{/if}

		<div class="mb-8">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Bio</h2>
			<p class="rounded-xl border border-purple-300 bg-white/10 p-5 text-indigo-100 shadow">
				{data.band?.description ?? 'Empty'}
			</p>
		</div>

		<div class="mb-8">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Members</h2>
			<ul class="flex flex-wrap gap-3">
				{#each data.band?.members as member}
					<li class="bg-purple-600/80 text-white px-4 py-2 rounded-full text-base font-semibold shadow">{member.displayName}</li>
				{/each}
			</ul>
		</div>

		<div class="mb-8">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Influences</h2>
			<ul class="flex flex-wrap gap-3">
				{#each data.band?.influences as influence}
					<li class="bg-pink-500/80 text-white px-4 py-2 rounded-full text-base font-semibold shadow">{influence.name}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
