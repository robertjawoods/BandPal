import { useState } from "react";
import { useSpotify } from "./useSpotify";
import debounce from "lodash.debounce";

interface ArtistData {
  name: string;
  id: string;
  genres: string[];
  image: any[];
}

interface UseInfluencesProps {
  userID: string;
}

type UseInfluencesReturn = {
  suggestions: ArtistData[];
  // eslint-disable-next-line no-unused-vars
  newSearch: (query: string) => void;
  // eslint-disable-next-line no-unused-vars
  set: (artist: ArtistData) => void;
  searchTerm: string;
};

export const useInfluences = ({
  userID,
}: UseInfluencesProps): UseInfluencesReturn => {
  const { getArtist } = useSpotify();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ArtistData[]>([]);

  const debouncedSearch = debounce(() => {
    getArtist(searchTerm)
      .then((data) => {
        const suggestions = data.artists.items.map((artist: any) => {
          return {
            name: artist.name,
            id: artist.id,
            genres: artist.genres,
            image: artist.images,
          };
        });
        console.log("returned suggestions");
        setSuggestions(suggestions);
      })
      .catch(() => {});
  }, 500);

  const newSearch = (query: string) => {
    if (query !== searchTerm) {
      console.log("searching.....");
      setSearchTerm(query);
      debouncedSearch();
    }
  };

  const select = (artist: ArtistData) => {
    setSearchTerm(artist.name);
    setSuggestions([]);

    fetch(`/api/user/profile/${userID}/influence`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: artist.name, id: artist.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("response data", data);
      });
  };

  return { suggestions, newSearch, select, searchTerm };
};
