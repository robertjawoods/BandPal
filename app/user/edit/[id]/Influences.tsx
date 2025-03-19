'use client'

import { useSpotify } from "@/app/lib/hooks/useSpotify";
import { useDebounce } from "@/app/lib/hooks/useDebounce";
import { useEffect, useState, useRef } from "react";

// interface InfluencesProps {
//     influences: {
//         name: string;
//         id: string;
//         profileId: string | null;
//     }[] | undefined;
// }

interface ArtistData { 
    name: string;
    id: string;
    genres: string[];
    image: any[];
}

export function Influences(/*{ influences }: InfluencesProps*/) {
    const { getArtist } = useSpotify();

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [suggestions, setSuggestions] = useState<ArtistData[]>([]);
   // const [loading, setLoading] = useState(false);
    const previousSearchTerm = useRef("");

    useEffect(() => {
        if (!debouncedSearchTerm || debouncedSearchTerm === previousSearchTerm.current) {
            return;
        }

        //setLoading(true);
        getArtist(debouncedSearchTerm)
            .then(data => {
                const suggestions = data.artists.items.map((artist: any) => {
                    return { 
                        name: artist.name,
                        id: artist.id,
                        genres: artist.genres, 
                        image: artist.images
                    }
                });
                
                setSuggestions(suggestions);
                previousSearchTerm.current = debouncedSearchTerm;
                //setLoading(false);

                console.log('suggestions', suggestions);
            })
            .catch(() => {})//setLoading(false));
    }, [debouncedSearchTerm, getArtist]);

    const handleSelect = (artist: ArtistData) => {
        setSearchTerm(artist.name);
        setSuggestions([]);
      };

    return (
        <div className="relative w-full max-w-sm">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            id="search"
            type="text"
            name="search"
            autoComplete="off"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white shadow-lg border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions.map(artist => (
                <li
                  key={artist.id}
                  onClick={() => handleSelect(artist)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {artist.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}