import axios from "axios";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const accessToken = localStorage?.getItem('spotify_access_token');


export const getTrackFollow = async () => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/me/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data.items;
    } catch (error) {
        console.error("tracks", error)
        return [];

    }
}

export const getTracksPlaylist = async (pid, limit) => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/playlists/${pid}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                limit: limit && limit
            }
        })
        return response.data;
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}



// thông tin bài hát đang phát
export const getCurrenTrack = async () => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/me/player/currently-playing`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (response.data && response.data.item) {
            return response.data;
        } else {
            console.log('No track is currently playing.');
            return null;
        }
    } catch (error) {
        console.error("tracks", error)
        return [];

    }
}



// Page Track

// nhạc gợi ý
export const getRecommendationsSongs = async (trackId) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/recommendations`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                seed_tracks: trackId,
                limit: 5,
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
};


// thông tin bài hát
export const getDetailTrack = async (trackId) => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/tracks/${trackId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return response.data;
    } catch (error) {

        console.error("tracks", error)
        return [];

    }
}

// thông tin các nghệ sĩ tham gia bài hát

export const getArtistsTrack = async (artists) => {
    const res = artists?.map(async (artist) => {
        try {
            const response = await axios.get(`${SPOTIFY_API_URL}/artists/${artist.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data
        } catch (error) {
            return error
        }
    })

    return Promise.all(res)
        .then((resutl) => {
            return resutl
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
