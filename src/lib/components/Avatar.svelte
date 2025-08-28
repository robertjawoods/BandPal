<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte/composed';

	let { imageUrl, displayName }: { imageUrl: string | null; displayName: string | undefined } =
		$props();

	const initials = displayName
		? displayName
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
		: '?';
</script>

<Avatar>
	<Avatar.Image src={imageUrl} />
	<Avatar.Fallback>{initials}</Avatar.Fallback>
</Avatar>
