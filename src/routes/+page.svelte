<script lang="ts">
	// Svelte 5 runes and props
	let { data } = $props();
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
	<section class="w-full max-w-3xl px-6 py-20 flex flex-col items-center text-center gap-8">
		<!-- <img src="/favicon.svg" alt="BandPal logo" class="w-24 h-24 mb-4 drop-shadow-lg animate-bounce-slow" /> -->
		<h1 class="text-5xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
			Welcome to <span class="text-purple-300">BandPal</span>
		</h1>
		<p class="text-xl md:text-2xl text-indigo-100 max-w-2xl mt-2 mb-6">
			Discover, connect, and collaborate with musicians. BandPal helps you find your next bandmate, showcase your influences, and join a vibrant music community.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/bands" class="btn btn-primary px-8 py-3 rounded-lg text-lg font-semibold shadow-lg bg-purple-600 hover:bg-purple-500 transition-colors">
				Explore Bands
			</a>
			<a href="/profile/edit/me" class="btn btn-secondary px-8 py-3 rounded-lg text-lg font-semibold shadow-lg bg-white text-purple-700 hover:bg-purple-100 transition-colors border border-purple-300">
				Create Your Profile
			</a>
		</div>
	</section>
	<section class="w-full max-w-4xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
		<div class="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
			<span class="text-4xl mb-2">🎸</span>
			<h2 class="text-xl font-bold mb-1">Find Musicians</h2>
			<p class="text-indigo-100">Search for musicians by instrument, genre, or influences. Connect with like-minded artists in your area.</p>
		</div>
		<div class="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
			<span class="text-4xl mb-2">🤝</span>
			<h2 class="text-xl font-bold mb-1">Join Bands</h2>
			<p class="text-indigo-100">Browse open bands or start your own. Collaborate, jam, and make music together.</p>
		</div>
		<div class="bg-white/10 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
			<span class="text-4xl mb-2">🌟</span>
			<h2 class="text-xl font-bold mb-1">Showcase Influences</h2>
			<p class="text-indigo-100">Share your musical influences and discover new sounds. Build your unique musical identity.</p>
		</div>
	</section>
</main>
