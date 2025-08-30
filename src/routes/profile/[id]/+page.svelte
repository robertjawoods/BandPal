<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-10 px-2 text-white">
	<div class="max-w-2xl mx-auto">
		<div class="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<h1 class="text-4xl font-extrabold tracking-tight drop-shadow-xl">{data.profile?.displayName}</h1>
			<a href="/profiles" class="btn btn-secondary px-5 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 hover:bg-purple-100 border border-purple-300 transition-colors">Back to Profiles</a>
		</div>

		{#if data.session?.profileId === data.profile?.id}
			<div class="mb-6 rounded-xl bg-purple-700/20 p-4 shadow border border-purple-400 text-purple-200 font-semibold">You are viewing your own profile.</div>
		{/if}

		<div class="mb-8">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Bio</h2>
			<p class="rounded-xl border border-purple-300 bg-white/10 p-5 text-indigo-100 shadow">
				{data.profile?.bio ?? 'No bio available.'}
			</p>
		</div>

		<div class="mb-8 flex flex-col items-center">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Avatar</h2>
			{#if data.profile?.avatarUrl}
				<img
					src={data.profile.avatarUrl}
					alt="Avatar"
					class="h-36 w-36 rounded-full border-4 border-purple-400 object-cover shadow-lg bg-white/20"
				/>
			{:else}
				<div class="flex h-36 w-36 items-center justify-center rounded-full border-4 border-purple-400 bg-white/20 shadow-lg">
					<span class="text-5xl font-extrabold text-purple-200">
						{data.profile?.displayName?.[0] ?? '?'}
					</span>
				</div>
			{/if}
		</div>

		<div class="mb-8">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Influences</h2>
			{#if data.profile?.influences.length > 0}
				<ul class="flex flex-wrap gap-3">
					{#each data.profile.influences as influence}
						<li class="bg-pink-500/80 text-white px-4 py-2 rounded-full text-base font-semibold shadow">{influence.name}</li>
					{/each}
				</ul>
			{:else}
				<p class="text-indigo-200">No influences listed.</p>
			{/if}
		</div>

		<div class="mb-8">
			<h2 class="mb-2 text-2xl font-bold text-white drop-shadow">Bands</h2>
			{#if data.profile?.bands.length > 0}
				<ul class="flex flex-wrap gap-5">
					{#each data.profile.bands as band}
						<li class="pt-2">
							<a
								href={`/band/${band.slug}`}
								class="bg-purple-600/80 text-white px-4 py-2 rounded-full text-base font-semibold shadow border-2 border-purple-400 {band.ownerId === data.profile.id ? 'ring-2 ring-emerald-400' : ''}"
							>{band.name}</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-indigo-200">This user is not a member of any bands.</p>
			{/if}
		</div>
	</div>
</div>
