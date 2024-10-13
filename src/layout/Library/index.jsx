import classNames from "classnames/bind"
import style from "./Library.module.scss"
import NavAction from "./Nav-action"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as apis from "../../apis"
import ItemLibrary from "../../components/Item-Library"
import icons from "@/utils/icons"

const { GoPlus } = icons
const cx = classNames.bind(style)

const Libary = () => {
    const [dataLibraryPlaylist, setDataLibraryPlaylist] = useState([])
    const [dataLibrary, setDataLibrary] = useState([])
    const [dataLibraryYourPlaylist, setDataLibraryYourPlaylist] = useState([])
    const [dataLibraryPlaylistSpotify, setDataLibraryPlaylistSpotify] = useState([])
    const [dataLibraryAlbums, setDataLibraryAlbums] = useState([])
    const [dataLibraryArtists, setDataLibraryArtists] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [toggleSidebar, setToggleSidebar] = useState(true)
    const { libraryType } = useSelector(state => state.actionOption)

    // const accessToken = localStorage.getItem('spotify_access_token');

    useEffect(() => {
        const getApi = async () => {
            setIsLoading(true)
            const [album, playlist, artists, tracks, urser] = await Promise.all([
                apis?.getUserAlbum(),
                apis?.getUserPlaylists(),
                apis?.getFollowedArtists(),
                apis?.getTrackFollow(),
                apis?.getUser()
            ])

            // console.log(tracks)
            if (album.length > 0 || playlist.length > 0 || artists.length > 0) {
                setDataLibrary(album?.concat(playlist, artists))
                setDataLibraryPlaylist(playlist)
                if (playlist) {
                    setDataLibraryYourPlaylist(playlist?.filter((item) => item.owner.id === urser.id))
                    setDataLibraryPlaylistSpotify(playlist?.filter((item) => item.owner.id !== urser.id))
                }
                setDataLibraryAlbums(album)
                setDataLibraryArtists(artists)
                setIsLoading(false)
            }
            else {
                setDataLibrary([])
                setDataLibraryPlaylist([])
                setDataLibraryAlbums([])
                setDataLibraryArtists([])
            }
        }
        getApi()

    }, [])


    const handleClickToggleSidebar = () => {
        setToggleSidebar(prev => !prev)
    }

    return (
        <div className={cx("wrapper", {
            toggleSidebar: toggleSidebar ? true : false
        })}>
            <div className={cx("main")}>
                <section className={cx("follow")}>
                    <div className={cx("heading")}>
                        <div className={cx("btn-library")} onClick={handleClickToggleSidebar}>
                            <div className={cx("icon")}>
                                <span className={cx("bar")}></span>
                                <span className={cx("bar")}></span>
                                <span className={cx("bar__big")}></span>
                            </div>
                            <h5>Thư viện</h5>
                        </div>
                        <button className={cx("btn__add")}>
                            <GoPlus />
                        </button>
                    </div>
                    <div className={cx("actions")}>
                        <NavAction />
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("list")}>
                            {
                                isLoading ? "loading..." : (
                                    <>
                                        {libraryType === "" && dataLibrary?.map((item, index) => <ItemLibrary toggle_sidebar={toggleSidebar} key={index} data={item} />)}
                                        {libraryType === "playlists" && dataLibraryPlaylist?.map((item, index) => <ItemLibrary toggle_sidebar={toggleSidebar} key={index} data={item} />)}
                                        {libraryType === "albums" && dataLibraryAlbums?.map((item, index) => <ItemLibrary toggle_sidebar={toggleSidebar} key={index} data={item} />)}
                                        {libraryType === "artists" && dataLibraryArtists?.map((item, index) => <ItemLibrary toggle_sidebar={toggleSidebar} key={index} data={item} />)}
                                        {libraryType === "playlists-spotify" && dataLibraryPlaylistSpotify?.map((item, index) => <ItemLibrary toggle_sidebar={toggleSidebar} key={index} data={item} />)}
                                        {libraryType === "your-playlists" && dataLibraryYourPlaylist?.map((item, index) => <ItemLibrary toggle_sidebar={toggleSidebar} key={index} data={item} />)}
                                    </>
                                )
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Libary