export const JIKAN_CONFIG = {
  BASE_URL: "https://api.jikan.moe/v4",
};

export const fetchAnime = async ({
  query,page=1
}: {
  query?: string;
  page?: number;
}): Promise<Anime[]> => {
  const endpoint = query
    ? `${JIKAN_CONFIG.BASE_URL}/anime?q=${encodeURIComponent(query)}`
    : `${JIKAN_CONFIG.BASE_URL}/top/anime?filter=bypopularity&page=${page}`;

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    console.log(await response.text());
    throw new Error(`Failed to fetch anime: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data; 
};

export const fetchAnimeDetails = async (
  animeId: string
): Promise<AnimeDetails> => {
  try {
    const response = await fetch(
      `${JIKAN_CONFIG.BASE_URL}/anime/${animeId}/full`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch anime details: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // Jikan returns the details in a "data" property
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error;
  }
};

// Additional useful functions for an IMDB-like anime app

export const fetchAnimeCharacters = async (
  animeId: string
): Promise<AnimeCharacter[]> => {
  try {
    const response = await fetch(
      `${JIKAN_CONFIG.BASE_URL}/anime/${animeId}/characters`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch anime characters: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching anime characters:", error);
    throw error;
  }
};

export const fetchAnimeRecommendations = async (
  animeId: string
): Promise<AnimeRecommendation[]> => {
  try {
    const response = await fetch(
      `${JIKAN_CONFIG.BASE_URL}/anime/${animeId}/recommendations`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch anime recommendations: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching anime recommendations:", error);
    throw error;
  }
};

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  type: string;
  episodes: number;
  status: string;
  score: number;
  year: number;
  genres: {
    mal_id: number;
    type: string;
    name: string;
  }[];
}

interface AnimeDetails extends Anime {
  title_english: string;
  title_japanese: string;
  synopsis: string;
  background: string;
  season: string;
  aired: {
    from: string;
    to: string;
    string: string;
  };
  duration: string;
  rating: string;
  studios: {
    mal_id: number;
    type: string;
    name: string;
  }[];
  trailer: {
    youtube_id: string;
    url: string;
  };
  producers: {
    mal_id: number;
    type: string;
    name: string;
  }[];
  source: string;
  relations: {
    relation: string;
    entry: {
      mal_id: number;
      type: string;
      name: string;
    }[];
  }[];
}

interface AnimeCharacter {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
      };
    };
    name: string;
  };
  role: string;
  voice_actors: {
    person: {
      mal_id: number;
      url: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
      name: string;
    };
    language: string;
  }[];
}

interface AnimeRecommendation {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
  };
  url: string;
  votes: number;
}

export {AnimeRecommendation, AnimeDetails, AnimeCharacter, Anime}