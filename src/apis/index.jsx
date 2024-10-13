import axios from "axios"

const accessToken = localStorage?.getItem('spotify_access_token');


export const handleApiRequest = async () => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return error
        } else {
            console.error("Lỗi khác:", error); // Xử lý các lỗi khác
        }
    }
};


// eslint-disable-next-line react-refresh/only-export-components
export * from "./Home"
// eslint-disable-next-line react-refresh/only-export-components
export * from "./Playlist"
// eslint-disable-next-line react-refresh/only-export-components
export * from "./Album"
// eslint-disable-next-line react-refresh/only-export-components
export * from "./Track"
// eslint-disable-next-line react-refresh/only-export-components
export * from "./Artists"
// eslint-disable-next-line react-refresh/only-export-components
export * from "./Player"
