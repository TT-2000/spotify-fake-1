import classNames from "classnames/bind"
import style from "./CurrentSong.module.scss"
import * as apis from "@/apis"
import { useEffect, useState } from "react"
import icons from "@/utils/icons"
import PropType from "prop-types"
import Participants from "./Participants"
import NextSong from "./NextSong"
const { HiMiniXMark,
    IoShareOutline, PiDotsThreeBold, GoPlusCircle } = icons

const cx = classNames.bind(style)

const CurrentSong = ({ isToggleLayoutCurrentSong }) => {
    const [dataDetailTrack, setDataDetailTrack] = useState([])
    const [listSongFormat, setListSongFormat] = useState([])
    const [dataArtist, setDataArtist] = useState(null)
    const [theNextSong, setTheNextSong] = useState(null)

    // detail
    // track

    useEffect(() => {
        const getApi = async () => {
            const res = await apis?.getCurrenTrack()

            if (res) {
                const href = res?.context?.href.split("/")
                const idlistPlay = href[href?.length - 1]
                const idArtist = res?.item?.artists[0]?.id

                const [playlist, artist, album, detailArtist, listSong] = await Promise.all([
                    res?.context?.type === "playlist" && apis?.getDetailPlaylist(idlistPlay),
                    res?.context?.type === "artist" && apis?.getDetailArtists(idlistPlay),
                    res?.context?.type === "album" && apis?.getDetailAlbum(idlistPlay),
                    apis?.getDetailArtists(idArtist),
                    apis?.getQueue()
                ])

                console.log(listSong.queue[0])

                if (playlist || artist || album && detailArtist) {
                    const nextSong = listSong?.queue[0]
                    setDataDetailTrack(res)
                    setListSongFormat(playlist?.data || artist?.data || album?.data)
                    setDataArtist(detailArtist?.data)
                    setTheNextSong(
                        {
                            images: nextSong?.album?.images[1]?.url,
                            title: nextSong?.name,
                            artists: nextSong?.artists,
                            id: nextSong?.id
                        }
                    )
                }
            }
        }
        getApi()
    }, [])


    return (
        <div className={cx("wrapper", {
            isToggleLayoutCurrentSong: isToggleLayoutCurrentSong
        })}>
            <main className={cx("main")}>
                {listSongFormat && <section className={cx("heading")}>
                    <h4 className={cx("text")}>
                        {listSongFormat?.name}
                    </h4>
                    <div className={cx("actions-heading")}>
                        <button className={cx("option")}>
                            <PiDotsThreeBold />
                        </button>
                        <button className={cx("close_layout")}>
                            <HiMiniXMark />
                        </button>
                    </div>
                </section>}

                {dataDetailTrack && <section className={cx("song-playing")}>
                    <div className={cx("poster")}>
                        <img src={dataDetailTrack?.item?.album?.images[0]?.url} alt={dataDetailTrack?.item?.name} />
                    </div>
                    <div className={cx("content")}>
                        <div className={cx("title")}>
                            <h4>{dataDetailTrack?.item?.name}</h4>
                            <ul className={cx("artists")}>
                                {dataDetailTrack?.item?.artists?.map((artist) => <li key={artist.id}>
                                    <span>{artist.name}</span>
                                    <p>,</p>
                                </li>)}
                            </ul>
                        </div>
                        <div className={cx("actions-current_track")}>
                            <button className={cx("share")}>
                                <IoShareOutline />
                            </button>
                            <button className={cx("follow-track")}>
                                <GoPlusCircle />
                            </button>
                        </div>
                    </div>
                </section>}




                {dataArtist && <section className={cx("introducing-artist")}>
                    <div className={cx("image")}>
                        <img src={dataArtist?.images[0]?.url} alt={dataArtist?.name} />
                        <h4>Giới thiệu về nghệ sĩ</h4>
                    </div>
                    <div className={cx("information")}>
                        <h4>{dataArtist?.name}</h4>
                        <div>
                            <h5 className={cx("follow")}>{dataArtist?.followers?.total.toLocaleString('de-DE')} người theo dõi</h5>
                            <button>Theo dõi</button>
                        </div>
                    </div>
                </section>}

                {dataDetailTrack &&
                    <Participants data={dataDetailTrack} />}

                {theNextSong && <NextSong data={theNextSong} />}
            </main>
        </div>
    )
}

CurrentSong.propTypes = {
    isToggleLayoutCurrentSong: PropType.bool
}

export default CurrentSong