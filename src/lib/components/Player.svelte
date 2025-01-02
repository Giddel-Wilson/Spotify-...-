<script lang="ts">
    import { onMount } from 'svelte';
    import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from 'lucide-svelte';
    
    export let player: Spotify.Player;
  
    let currentTrack: Spotify.Track | null = null;
    let isPlaying = false;
    let progress = 0;
    let volume = 0.5;
  
    onMount(() => {
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
  
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
  
      player.addListener('player_state_changed', (state) => {
        if (state) {
          currentTrack = state.track_window.current_track;
          isPlaying = !state.paused;
          progress = state.position;
        }
      });
  
      player.connect();
    });
  
    function togglePlay() {
      if (isPlaying) {
        player.pause();
      } else {
        player.resume();
      }
      isPlaying = !isPlaying;
    }
  
    function skipNext() {
      player.nextTrack();
    }
  
    function skipPrevious() {
      player.previousTrack();
    }
  
    function setVolume(newVolume: number) {
      volume = newVolume;
      player.setVolume(volume);
    }
  
    $: if (currentTrack) {
      document.title = `${currentTrack.name} - ${currentTrack.artists[0].name}`;
    }
  </script>
  
  <div class="h-20 bg-black border-t border-gray-800 px-4 flex items-center justify-between">
    <div class="flex items-center w-1/3">
      {#if currentTrack}
        <img src={currentTrack.album.images[0].url} alt={currentTrack.name} class="h-14 w-14" />
        <div class="ml-4">
          <div class="text-sm text-white">{currentTrack.name}</div>
          <div class="text-xs text-gray-400">{currentTrack.artists[0].name}</div>
        </div>
      {/if}
    </div>
  
    <div class="flex flex-col items-center w-1/3">
      <div class="flex items-center gap-6">
        <button class="text-gray-400 hover:text-white">
          <Shuffle class="h-5 w-5" />
        </button>
        <button class="text-gray-400 hover:text-white" on:click={skipPrevious}>
          <SkipBack class="h-5 w-5" />
        </button>
        <button class="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105" on:click={togglePlay}>
          {#if isPlaying}
            <Pause class="h-5 w-5" />
          {:else}
            <Play class="h-5 w-5" />
          {/if}
        </button>
        <button class="text-gray-400 hover:text-white" on:click={skipNext}>
          <SkipForward class="h-5 w-5" />
        </button>
        <button class="text-gray-400 hover:text-white">
          <Repeat class="h-5 w-5" />
        </button>
      </div>
      <div class="w-full max-w-md mt-2 flex items-center gap-2">
        <div class="text-xs text-gray-400">{Math.floor(progress / 1000 / 60)}:{Math.floor((progress / 1000) % 60).toString().padStart(2, '0')}</div>
        <div class="flex-1 h-1 bg-gray-600 rounded-full">
          <div class="h-full bg-white rounded-full" style="width: {(progress / (currentTrack?.duration_ms || 1)) * 100}%"></div>
        </div>
        <div class="text-xs text-gray-400">{Math.floor((currentTrack?.duration_ms || 0) / 1000 / 60)}:{Math.floor(((currentTrack?.duration_ms || 0) / 1000) % 60).toString().padStart(2, '0')}</div>
      </div>
    </div>
  
    <div class="flex items-center justify-end w-1/3">
      <div class="flex items-center gap-2">
        <Volume2 class="h-5 w-5 text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={volume}
          on:change={() => setVolume(volume)}
          class="w-24 h-1 bg-gray-600 rounded-full appearance-none"
        />
      </div>
    </div>
  </div>
  
  