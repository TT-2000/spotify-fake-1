import axios from "axios";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const accessToken = localStorage?.getItem('spotify_access_token');


// album bạn thích
export const getUserAlbum = async () => {
    try {
        const response = await axios.get(
            `${SPOTIFY_API_URL}/me/albums`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.items;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};

// nội dung album
export const getDetailAlbum = async (aid) => {
    try {
        const response = await axios.get(
            `${SPOTIFY_API_URL}/albums/${aid}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};


// nội dung album
export const getTracksAlbum = async (aid, limit) => {
    try {
        const response = await axios.get(
            `${SPOTIFY_API_URL}/albums/${aid}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    limit: limit
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};