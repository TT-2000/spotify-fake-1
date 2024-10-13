import axios from "axios";

const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const accessToken = localStorage?.getItem('spotify_access_token');

// bản phát hành mới
export const getNewReleases = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/browse/new-releases`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching new releases", error);
        return [];
    }
};


// thể loại
export const getCategories = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/browse/categories`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 50
            }
        });
        return response.data.categories;
    } catch (error) {
        console.error("Error fetching categories", error);
        return [];
    }
};


// danh sách nghe lại
export const getRecently = async () => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/me/player/recently-played?limit=50`, {
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


// Xếp hạng toàn cầu
export const getRankGlobal = async () => {
    try {
        const response = await axios.get(`
            ${SPOTIFY_API_URL}/me/player/recently-played?limit=50`, {
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


// danh sách playlists radio phổ biến
export const getSearch = async (value, type, limit) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/search?q=${value}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: limit || null,
                type: type,
            }

        });
        return response.data
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}

// danh sách playlists radio phổ biến
export const getSearchPage = async (value, limit) => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/search?q=${value}&type=album%2Cplaylist%2Ctrack%2Cartist`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: limit
            }

        });
        return response.data
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}

// user
export const getUser = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}


// danh sách phát

export const getQueue = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/player/queue `, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }

        });
        return response.data
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}


// next
// có Premium
export const getActionNext = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/player/next `, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }

        });
        return response
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}

// prev
// có Premium
export const getActionPrev = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/player/previous `, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }

        });

        return response
    } catch (error) {
        console.error("tracks", error)
        return [];
    }
}