const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpiration: number = 0;

async function getAccessToken() {
  try {
    if (accessToken && Date.now() < tokenExpiration) {
      return accessToken;
    }

    console.log('Fetching new access token');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiration = Date.now() + (data.expires_in * 1000);
    console.log('New access token obtained');
    return accessToken;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

async function spotifyApi(endpoint: string, timeout = 10000) {
  try {
    const token = await getAccessToken();
    console.log(`Making API call to: ${endpoint}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API error response for ${endpoint}:`, errorBody);
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`API call successful: ${endpoint}`);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`API request timeout for ${endpoint}`);
      throw new Error('Request timed out');
    }
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
}

export async function getTopArtists() {
  const data = await spotifyApi('/artists?ids=4q3ewBCX7sLwd24euuV69X,1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR,06HL4z0CvFAxyc27GXpf02,3TVXtAsR1Inumwj472S9r4');
  return data.artists;
}

export async function getNewReleases() {
  const data = await spotifyApi('/browse/new-releases?limit=6');
  return data.albums.items;
}

export async function getPlaylists() {
  try {
    const searchData = await spotifyApi('/search?q=top%20playlist&type=playlist&limit=6');
    return searchData.playlists.items;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    
    const playlistIds = [
      '37i9dQZF1DXcBWIGoYBM5M',
      '37i9dQZF1DX0XUsuxWHRQd',
      '37i9dQZF1DX10zKzsJ2jva',
      '37i9dQZF1DX4JAvHpjipBk',
      '37i9dQZF1DX4sWSpwq3LiO',
      '37i9dQZF1DXbTxeAdrVG2l'
    ];
    const playlistPromises = playlistIds.map(id => spotifyApi(`/playlists/${id}`));
    const playlists = await Promise.allSettled(playlistPromises);
    return playlists
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);
  }
}

export async function getCategories() {
  const data = await spotifyApi('/browse/categories?limit=6');
  return data.categories.items;
}

