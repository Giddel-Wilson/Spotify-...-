declare namespace SpotifyApi {
  interface ArtistObjectFull {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  }

  interface AlbumObjectSimplified {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    artists: Array<{
      id: string;
      name: string;
    }>;
  }

  interface PlaylistObjectSimplified {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    owner: {
      display_name: string;
    };
  }
}

