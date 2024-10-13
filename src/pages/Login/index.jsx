import { clientId, redirectUri, scopes } from '../../spotifyConfig';
import classNames from "classnames/bind"
import style from "./Login.module.scss"

const cx = classNames.bind(style)

const Login = () => {

    const handleLogin = () => {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token`;
        window.location.href = authUrl;
    };

    return (
        <div className={cx("container-login")}>
            <div className={cx("content-login")}>
                <div className={cx("heading-login")}><h1>Đăng nhập</h1>
                    <span>Api Spotify</span></div>
                <button onClick={handleLogin}>Login Spotify</button>
            </div>
        </div>
    );
};

export default Login;





