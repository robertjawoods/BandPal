<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-16 px-4">
	<div class="w-full max-w-md bg-white/10 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-8 border border-purple-300">
		<h1 class="text-3xl font-extrabold tracking-tight text-center mb-2">Sign in to BandPal</h1>
		<p class="text-indigo-100 text-center mb-4">Connect with musicians, join bands, and share your influences.</p>
		<SignIn provider="google" class="w-full">
			<button class="w-full btn btn-primary px-6 py-3 rounded-lg text-lg font-semibold shadow bg-purple-600 hover:bg-purple-500 text-white border border-purple-400 transition-colors flex items-center justify-center gap-2">
				<svg class="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.74H24v9.04h12.42c-.54 2.9-2.18 5.36-4.64 7.04l7.18 5.6C43.27 37.27 46.1 31.36 46.1 24.5z"/><path fill="#FBBC05" d="M10.67 28.04c-1.04-3.12-1.04-6.44 0-9.56l-7.98-6.2C.9 16.36 0 20.06 0 24c0 3.94.9 7.64 2.69 11.72l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.04 15.15-5.56l-7.18-5.6c-2.01 1.36-4.6 2.16-7.97 2.16-6.38 0-11.87-3.63-13.33-8.78l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
				Sign in with Google
			</button>
		</SignIn>
	</div>
</div>
