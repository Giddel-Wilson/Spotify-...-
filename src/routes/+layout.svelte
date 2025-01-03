<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import '../app.css';

	let mainContentRef: HTMLElement;
</script>

<div class="flex h-screen flex-col bg-black text-white">
	<div class="flex flex-1 overflow-hidden">
		<Sidebar />
		<div class="flex-1">
			<TopBar />
			<main
				bind:this={mainContentRef}
				class="w-[99.5%] h-full overflow-y-auto rounded-lg bg-gradient-to-b from-[#1a1a1a] overflow-hidden"
			>
				<div class="px-6 pb-6">
					<slot />
				</div>
			</main>
		</div>
	</div>

	<!-- Preview Banner -->
	<div
		class="mt-2 flex items-center justify-between bg-gradient-to-r from-[#ae2896] to-[#509bf5] p-4"
	>
		<div>
			<p class="font-bold">Preview of Spotify</p>
			<p class="text-sm">
				Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
			</p>
		</div>
		<button
			class="rounded-full bg-white px-8 py-3 font-bold text-black transition-transform hover:scale-105"
		>
			Sign up free
		</button>
	</div>
</div>

<style>
	:global(body) {
	  margin: 0;
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	  background-color: black;
	}
	:global(*::-webkit-scrollbar) {
	width: 16px;
  }
  
  :global(*::-webkit-scrollbar-track) {
	background: transparent;
  }
  
  :global(*::-webkit-scrollbar-thumb) {
	background-color: hsla(0, 0%, 100%, .3);
	min-height: 32px;
	border: 3px solid transparent;
	background-clip: padding-box;
	border-radius: 8px;
  }
  
  :global(*::-webkit-scrollbar-thumb:hover) {
	background-color: hsla(0, 0%, 100%, .4);
  }
  
  :global(*::-webkit-scrollbar-button) {
	display: none;
  }
  </style>
