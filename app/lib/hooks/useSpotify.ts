import { useCallback, useEffect, useState } from "react";

export function useSpotify() {

    const [token, setToken] = useState<string | null>(null);
    const [tokenExpires, setTokenExpires] = useState<number | null>(null);

    const getSpotifyToken = useCallback(async () => {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
            });
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
            setToken(data.access_token);
            setTokenExpires(Date.now() + data.expires_in * 1000);
        } catch (error) {
            console.error("Error:", error);
        }
    }, []);

    useEffect(() => {
        getSpotifyToken();
    }, [getSpotifyToken])

    useEffect(() => {
        if (!tokenExpires) return;
    
        const now = Date.now();
        const timeout = tokenExpires - now;
        const timerId = setTimeout(() => {
          getSpotifyToken();
        }, timeout);
    
        return () => clearTimeout(timerId);
      }, [tokenExpires, getSpotifyToken]);

    const getArtist = async (artist: string, limit?: number, offset?: number) => {
        if (!limit) limit = 20;
        if (!offset) offset = 0;

        const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }

    return { getArtist };
}
