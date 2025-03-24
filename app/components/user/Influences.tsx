'use client'

import { useState } from "react";

interface InfluencesProps {
  influences: {
    name: string;
    id: string;
    profileId: string | null;
  }[] | undefined;
  userId: string
}

interface ArtistData {
  name: string;
  id: string;
  genres: string[];
  image: any[];
}

export function Influences({ influences, userId }: InfluencesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ArtistData[]>([]);
  // const [loading, setLoading] = useState(false);


  const handleSelect = (artist: ArtistData) => {
    setSearchTerm(artist.name);
    setSuggestions([]);

    fetch(`/api/user/profile/${userId}/influence`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: artist.name, id: artist.id })
    })
      .then(res => res.json())
      .then(data => {
        console.log('response data', data);
      })
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