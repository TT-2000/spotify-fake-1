import axios from "axios";

const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const accessToken = localStorage?.getItem('spotify_access_token');

// bản phát hành mới
export const getAudio = async (trackId) => {

    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/audio-features/${trackId}`, {
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


export const getPlaying = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/player`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.devices;
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}



export const getAvailableDevices = async () => {
    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/me/player/devices`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.devices;
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
};

// phát nhạc
export const playTrack = async (deviceId, trackUri) => {
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

    const data = {
        uris: [trackUri],
    };

    try {
        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Track is playing:', response.status);
    } catch (error) {
        console.error('Error playing track:', error);
    }
};




export const playMusicPlaylist = async (playlistId) => {
    const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const response = await fetch(tracksUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        data.items.forEach(item => {
            console.log(item.track.name);
        });
    } else {
        console.error("Error fetching tracks:", await response.json());
    }
}


export const playMusic = async (deviceId, playlistId) => {
    const playUrl = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;

    const data = {
        context_uri: `spotify:playlist:${playlistId}`,
        offset: { position: 0 },
        position_ms: 0,
    };

    const response = await fetch(playUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        console.log("started");
    } else {
        console.error("Error starting playback:", await response.json());
    }
}