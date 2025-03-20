"use client";
import { useInfluences } from "@/app/lib/hooks/useInfluences";

interface InfluencesProps {
  influences:
    | {
        name: string;
        id: string;
        profileId: string | null;
      }[]
    | undefined;
  userId: string;
}

export function Influences({ influences, userId }: InfluencesProps) {
  console.log("influences", influences);
  const { suggestions, newSearch, select, searchTerm } = useInfluences({
    userID: userId,
  });
  return (
    <div className="relative w-full max-w-sm">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Search
      </label>
      <input
        id="search"
        type="text"
        name="search"
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => newSearch(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-lg border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((artist) => (
            <li
              key={artist.id}
              onClick={() => select(artist)}
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
