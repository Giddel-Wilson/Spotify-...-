<script lang="ts">
  import { ChevronLeft, ChevronRight, Bell, User, Search } from 'lucide-svelte';
  import { page } from '$app/stores';

  let searchQuery = '';
  let isScrolled = false;

  function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    isScrolled = target.scrollTop > 0;
  }
</script>

<div 
  class="sticky top-0 z-40 flex items-center justify-between px-6 py-6 transition-colors"
  class:bg-black={isScrolled}
  on:scroll={handleScroll}
>
  <div class="flex items-center gap-2 mt-4">
    <button 
      class="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 cursor-not-allowed opacity-60"
    >
      <ChevronLeft class="h-5 w-5" />
    </button>
    <button 
      class="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 cursor-not-allowed opacity-60"
    >
      <ChevronRight class="h-5 w-5" />
    </button>

    {#if $page.route.id === '/search'}
      <div class="relative ml-2">
        <input
          type="search"
          placeholder="What do you want to play?"
          bind:value={searchQuery}
          class="w-80 h-12 bg-white rounded-full px-12 text-black placeholder-gray-500 focus:outline-none"
        />
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    <a
      href="https://spotify.com/download"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-400 hover:text-white hover:scale-105 transition-all text-sm font-bold bg-black/70 rounded-full px-4 py-2"
    >
      Install App
    </a>
    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/70">
      <Bell class="h-5 w-5" />
    </button>
    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/70">
      <User class="h-5 w-5" />
    </button>
  </div>
</div>

