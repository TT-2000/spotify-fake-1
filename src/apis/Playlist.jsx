
import axios from "axios";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const accessToken = localStorage?.getItem('spotify_access_token');

// nội dung playlist
// playlist theo thể loại
// playlist bạn theo dõi
// playlist nổi bật
// danh sách playlists radio phổ biến

// nội dung playlist
export const getDetailPlaylist = async (pid) => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/playlists/${pid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}

// playlist theo thể loại
export const getPlaylistsCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/browse/categories/${categoryId}/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 50
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching playlists from category", error);
        return [];
    }
};


// playlist bạn theo dõi
export const getUserPlaylists = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};


// playlist nổi bật
export const getFeaturedPlaylists = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/browse/featured-playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 50
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user playlists", error);
        return [];
    }
};


// danh sách playlists radio phổ biến
export const getPlaylistsRadio = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/search?q=radio&type=playlist`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        });
        return response
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}



export const getRecommendations = async (trackId) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                seed_tracks: trackId,
                limit: 10,

            }
        });

        return response.data.tracks;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
};