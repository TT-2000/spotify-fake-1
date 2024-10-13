import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash.substring(1).split('&').reduce((initial, item) => {
            if (item) {
                const parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});

        const { access_token } = hash;
        if (access_token) {
            spotifyApi.setAccessToken(access_token);
            localStorage.setItem('spotify_access_token', access_token);
            navigate('/');
            location.reload();

        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;