import axios from "axios";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const accessToken = localStorage?.getItem('spotify_access_token');

// nghệ sĩ bạn theo dõi
export const getFollowedArtists = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/following?type=artist`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.artists.items;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};

// nghệ sĩ yêu thích của bạn 
export const getAvoriteArtists = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/top/artists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};


//  
export const getDetailArtists = async (aid) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/artists/${aid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};

//  
export const getAlbumArtist = async (aid, type, limit) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/artists/${aid}/albums`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                include_groups: type,
                limit: limit || 50
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};


export const getArtistTopTrack = async (aid) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/artists/${aid}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};


// related-artists
export const getRelatedArtists = async (aid) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/artists/${aid}/related-artists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};