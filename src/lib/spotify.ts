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

async function spotifyApi(endpoint: string) {
  try {
    const token = await getAccessToken();
    console.log(`Making API call to: ${endpoint}`);
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API error response: ${errorBody}`);
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`API call successful: ${endpoint}`);
    return data;
  } catch (error) {
    console.error('API request error:', error);
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

export async function getFeaturedPlaylists() {
  const data = await spotifyApi('/browse/featured-playlists?limit=6');
  return data.playlists.items;
}

export async function getCategories() {
  const data = await spotifyApi('/browse/categories?limit=6');
  return data.categories.items;
}

