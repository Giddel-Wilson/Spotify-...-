<script lang="ts">
  import { Home, Search, Library, Plus, Heart, Globe } from 'lucide-svelte';
  import SpotifyIcon from './icons/SpotifyIcon.svelte';
</script>

<div class="w-[420px] bg-black flex flex-col h-full">
  <div class="p-6">
    <SpotifyIcon size={40} />
  </div>

  <div class="mt-2 flex-1 min-h-0">
    <div class="bg-[#121212] mx-2 rounded-lg flex flex-col h-full">
      <div class="p-4 flex items-center justify-between">
        <button class="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
          <Library class="h-7 w-7" />
          <span class="font-bold">Your Library</span>
        </button>
        <button class="text-gray-300 hover:text-white transition-colors p-1">
          <Plus class="h-5 w-5" />
        </button>
      </div>

      <div class="px-2 overflow-y-auto flex-1">
        <div class="p-4 bg-[#242424] rounded-lg mb-4">
          <h3 class="font-bold text-white text-base mb-1">Create your first playlist</h3>
          <p class="text-[14px] text-gray-300 mb-4">It's easy, we'll help you</p>
          <button class="bg-white text-black px-4 py-2 rounded-full text-[14px] font-bold hover:scale-105 transition-transform">
            Create playlist
          </button>
        </div>

        <div class="p-4 bg-[#242424] rounded-lg">
          <h3 class="font-bold text-white text-base mb-1">Let's find some podcasts to follow</h3>
          <p class="text-[14px] text-gray-300 mb-4">We'll keep you updated on new episodes</p>
          <button class="bg-white text-black px-4 py-2 rounded-full text-[14px] font-bold hover:scale-105 transition-transform">
            Browse podcasts
          </button>
        </div>
      </div>

      <div class="mt-auto p-6 text-xs">
        <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-400 mb-6">
          <a href="/legal" class="hover:underline">Legal</a>
          <a href="/privacy-center" class="hover:underline">Privacy Center</a>
          <a href="/privacy" class="hover:underline">Privacy Policy</a>
          <a href="/cookies" class="hover:underline">Cookies</a>
          <a href="/about-ads" class="hover:underline">About Ads</a>
          <a href="/accessibility" class="hover:underline">Accessibility</a>
        </div>
        <button class="border border-gray-400 text-white px-3 py-1 rounded-full text-[13px] font-medium hover:border-white hover:scale-105 transition-all flex items-center gap-1">
          <Globe class="h-4 w-4" />
          English
        </button>
      </div>
    </div>
  </div>
</div>

