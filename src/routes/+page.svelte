<script lang="ts">
  import { onMount } from 'svelte';
  import { getTopArtists, getNewReleases, getFeaturedPlaylists, getCategories } from '$lib/spotify';

  let artists: any[] = [];
  let albums: any[] = [];
  let playlists: any[] = [];
  let categories: any[] = [];
  let loading = true;
  let errors: Record<string, string> = {};

  async function fetchData(fetcher: () => Promise<any>, key: string) {
    try {
      return await fetcher();
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
      errors[key] = err instanceof Error ? err.message : 'An unknown error occurred';
      return [];
    }
  }

  onMount(async () => {
    [artists, albums, playlists, categories] = await Promise.all([
      fetchData(getTopArtists, 'artists'),
      fetchData(getNewReleases, 'albums'),
      fetchData(getFeaturedPlaylists, 'playlists'),
      fetchData(getCategories, 'categories')
    ]);
    loading = false;
  });
</script>

<div class="space-y-8 pt-2">
  {#if Object.keys(errors).length > 0}
    <div class="bg-red-500/10 text-red-500 p-4 rounded-lg mx-2 mt-2">
      {#each Object.entries(errors) as [key, error]}
        <p>Error fetching {key}: {error}</p>
      {/each}
    </div>
  {/if}

  {#if loading}
    <div class="flex items-center justify-center h-[50vh]">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
    </div>
  {:else}
    <!-- Top Artists -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Top artists</h2>
        <a href="/artists" class="text-sm text-gray-400 hover:text-white hover:underline">
          Show all
        </a>
      </div>
      {#if artists.length > 0}
        <div class="grid grid-cols-6 gap-6">
          {#each artists as artist}
            <a href={`/artist/${artist.id}`} class="group">
              <div class="aspect-square rounded-full overflow-hidden relative">
                <img 
                  src={artist.images[0]?.url || '/placeholder.jpg'} 
                  alt={artist.name}
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="mt-4 text-center">
                <div class="font-bold text-base group-hover:underline">{artist.name}</div>
                <div class="text-sm text-gray-400">Artist</div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p class="text-gray-400">No artists available</p>
      {/if}
    </section>

    <!-- New Releases -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">New releases</h2>
        <a href="/albums" class="text-sm text-gray-400 hover:text-white hover:underline">
          Show all
        </a>
      </div>
      {#if albums.length > 0}
        <div class="grid grid-cols-6 gap-6">
          {#each albums as album}
            <a 
              href={`/album/${album.id}`} 
              class="p-4 rounded-lg bg-[#181818] hover:bg-[#282828] transition-all duration-300 group"
            >
              <div class="aspect-square rounded-md overflow-hidden relative">
                <img 
                  src={album.images[0]?.url || '/placeholder.jpg'} 
                  alt={album.name}
                  class="w-full h-full object-cover shadow-lg"
                />
              </div>
              <div class="mt-4">
                <div class="font-bold text-base truncate">{album.name}</div>
                <div class="text-sm text-gray-400 truncate">
                  {album.artists.map(a => a.name).join(', ')}
                </div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p class="text-gray-400">No albums available</p>
      {/if}
    </section>

    <!-- Featured Playlists -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Featured playlists</h2>
        <a href="/playlists" class="text-sm text-gray-400 hover:text-white hover:underline">
          Show all
        </a>
      </div>
      {#if playlists.length > 0}
        <div class="grid grid-cols-6 gap-6">
          {#each playlists as playlist}
            <a 
              href={`/playlist/${playlist.id}`} 
              class="p-4 rounded-lg bg-[#181818] hover:bg-[#282828] transition-all duration-300 group"
            >
              <div class="aspect-square rounded-md overflow-hidden relative">
                <img 
                  src={playlist.images[0]?.url || '/placeholder.jpg'} 
                  alt={playlist.name}
                  class="w-full h-full object-cover shadow-lg"
                />
              </div>
              <div class="mt-4">
                <div class="font-bold text-base truncate">{playlist.name}</div>
                <div class="text-sm text-gray-400 truncate">
                  By {playlist.owner.display_name}
                </div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p class="text-gray-400">No playlists available</p>
      {/if}
    </section>

    <!-- Browse Categories -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Browse all</h2>
        <a href="/categories" class="text-sm text-gray-400 hover:text-white hover:underline">
          Show all
        </a>
      </div>
      {#if categories.length > 0}
        <div class="grid grid-cols-6 gap-6">
          {#each categories as category}
            <a 
              href={`/category/${category.id}`} 
              class="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img 
                src={category.icons[0]?.url || '/placeholder.jpg'} 
                alt={category.name}
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <h3 class="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <p class="text-gray-400">No categories available</p>
      {/if}
    </section>
  {/if}
</div>

